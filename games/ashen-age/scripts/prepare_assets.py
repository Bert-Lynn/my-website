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

def prepare(item):
    target = ROOT / item['path']
    target.parent.mkdir(parents=True, exist_ok=True)
    if not item.get('optimize') and target.exists() and hashlib.sha256(target.read_bytes()).hexdigest() == item['sha256']:
        return {'path': item['path'], 'size': target.stat().st_size, 'cached': True}
    data = None
    for attempt in range(3):
        try:
            request = urllib.request.Request(item['url'], headers={'User-Agent': 'AshenAgeAssetBuild/1.0'})
            with urllib.request.urlopen(request, timeout=45) as response:
                data = response.read(item['size'] + 1)
            if len(data) != item['size'] or hashlib.sha256(data).hexdigest() != item['sha256']:
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
