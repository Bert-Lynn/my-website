#!/usr/bin/env python3
"""Resize embedded glTF textures without changing geometry, skin or animation."""
import io
import json
import struct
import sys
from pathlib import Path
from PIL import Image

def optimize_glb(source, destination, max_size=1024):
    data = Path(source).read_bytes()
    if data[:4] != b'glTF':
        raise ValueError('Input is not a GLB')
    json_length = struct.unpack_from('<I', data, 12)[0]
    document = json.loads(data[20:20 + json_length])
    binary = data[28 + json_length:]
    replacements = {}
    for image in document.get('images', []):
        view_index = image.get('bufferView')
        if view_index is None:
            continue
        view = document['bufferViews'][view_index]
        offset = view.get('byteOffset', 0)
        raw = binary[offset:offset + view['byteLength']]
        decoded = Image.open(io.BytesIO(raw))
        if max(decoded.size) <= max_size:
            continue  # Existing 1024px JPEGs are already suitable; avoid lossy re-encoding.
        decoded.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
        encoded = io.BytesIO()
        has_alpha = 'A' in decoded.getbands() and decoded.getextrema()[-1][0] < 255
        if has_alpha:
            decoded.save(encoded, 'PNG', optimize=True)
            image['mimeType'] = 'image/png'
        else:
            decoded.convert('RGB').save(encoded, 'JPEG', quality=88, subsampling=0, optimize=True)
            image['mimeType'] = 'image/jpeg'
        replacements[view_index] = encoded.getvalue()
    payload = bytearray()
    for index, view in enumerate(document['bufferViews']):
        offset = view.get('byteOffset', 0)
        content = replacements.get(index, binary[offset:offset + view['byteLength']])
        payload.extend(b'\0' * ((-len(payload)) % 4))
        view['byteOffset'] = len(payload)
        view['byteLength'] = len(content)
        payload.extend(content)
    payload.extend(b'\0' * ((-len(payload)) % 4))
    document['buffers'] = [{'byteLength': len(payload)}]
    encoded_json = json.dumps(document, separators=(',', ':'), ensure_ascii=False).encode()
    encoded_json += b' ' * ((-len(encoded_json)) % 4)
    output = struct.pack('<4sII', b'glTF', 2, 28 + len(encoded_json) + len(payload))
    output += struct.pack('<I4s', len(encoded_json), b'JSON') + encoded_json
    output += struct.pack('<I4s', len(payload), b'BIN\0') + payload
    Path(destination).parent.mkdir(parents=True, exist_ok=True)
    Path(destination).write_bytes(output)
    return len(data), len(output)

if __name__ == '__main__':
    before, after = optimize_glb(sys.argv[1], sys.argv[2])
    print(f'{Path(sys.argv[2]).name}: {before} -> {after} bytes')
