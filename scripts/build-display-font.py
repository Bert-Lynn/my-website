"""Regenerate the local display font from an original Noto Serif CJK Regular TTC.
Usage: python scripts/build-display-font.py /path/to/NotoSerifCJK-Regular.ttc
Requires fontTools. No network access, application state, or uploads are involved.
"""
from pathlib import Path
import sys
from fontTools import subset
from fontTools.ttLib import TTFont
root = Path(__file__).resolve().parent.parent
source = Path(sys.argv[1])
font = TTFont(source, fontNumber=2)
assert font['name'].getDebugName(1) == 'Noto Serif CJK SC', 'Use the official SC face'
assert font['name'].getDebugName(5).startswith('Version 2.003;'), 'Pinned source: Noto Serif CJK 2.003'
text = ''.join(p.read_text() for extension in ('*.js', '*.html') for p in root.glob(extension))
text += ''.join(p.read_text() for p in (root / 'data').glob('*.json'))
text += '成长手记书斋行知册页版卷一二三四五'
options = subset.Options()
options.flavor = 'woff'
options.name_IDs = ['*']
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=text)
subsetter.subset(font)
names = {1:'Growth Song', 3:'Growth Song Regular 2026', 4:'Growth Song Regular', 6:'GrowthSong-Regular', 16:'Growth Song', 17:'Regular'}
for record in font['name'].names:
    if record.nameID in names:
        record.string = names[record.nameID].encode(record.getEncoding())
font.flavor = 'woff'
output = root / 'assets/fonts/growth-song.woff'
output.parent.mkdir(parents=True, exist_ok=True)
font.save(output)
print(f'Created {output.name}: {output.stat().st_size} bytes')
