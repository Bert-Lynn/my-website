#!/usr/bin/env python3
"""Prepare version-pinned assets for same-origin deployment, never at runtime."""
import concurrent.futures
import hashlib
import json
import tempfile
import time
import urllib.request
from pathlib import Path
from optimize_glb import optimize_glb

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = json.loads((ROOT / 'assets-manifest.json').read_text())

def valid_bytes(data, item):
    if len(data) != item['size']:
        return False
    if item.get('sha256'):
        return hashlib.sha256(data).hexdigest() == item['sha256']
    if item.get('git_blob_sha'):
        payload = b'blob ' + str(len(data)).encode() + b'\\0' + data
        return hashlib.sha1(payload).hexdigest() == item['git_blob_sha']
    raise ValueError('Asset manifest requires sha256 or git_blob_sha: ' + item['path'])

def prepare(item):
    target = ROOT / item['path']
    target.parent.mkdir(parents=True, exist_ok=True)
    if not item.get('optimize') and target.exists() and valid_bytes(target.read_bytes(), item):
        return {'path': item['path'], 'size': target.stat().st_size, 'cached': True}
    data = None
    for attempt in range(3):
        try:
            request = urllib.request.Request(item['url'], headers={'User-Agent': 'AshenAgeAssetBuild/1.0'})
            with urllib.request.urlopen(request, timeout=45) as response:
                data = response.read(item['size'] + 1)
            if not valid_bytes(data, item):
                raise ValueError('Pinned asset checksum mismatch: ' + item['path'])
            break
        except Exception:
            if attempt == 2:
                raise
            time.sleep(2 ** attempt)
    if item.get('optimize'):
        with tempfile.NamedTemporaryFile(suffix='.glb') as source:
            source.write(data)
            source.flush()
            optimize_glb(source.name, target)
    else:
        target.write_bytes(data)
    return {'path': item['path'], 'size': target.stat().st_size, 'sha256': hashlib.sha256(target.read_bytes()).hexdigest()}

if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(prepare, MANIFEST))
    (ROOT / 'asset-build.json').write_text(json.dumps(results, indent=2))
    print(json.dumps(results, indent=2))
