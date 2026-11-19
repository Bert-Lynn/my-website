#!/usr/bin/env python3
"""Rebuild the offline CI-only font from the system's OFL Noto CJK collection."""
from pathlib import Path
import hashlib
import json
import unicodedata
from fontTools import subset
from fontTools.ttLib import TTFont

HERE = Path(__file__).resolve().parent
GAME = HERE.parents[1]
SOURCE = Path('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc')
COPYRIGHT = Path('/usr/share/doc/fonts-noto-cjk/copyright')
FILES = [GAME / name for name in ('index.html', 'main.js', 'environment.js', 'style.css')]
FAMILY = 'Ashen QA CJK'
POSTSCRIPT = 'AshenQACJK-Regular'

# SC is collection face 2; verify instead of silently taking a different region.
font = TTFont(SOURCE, fontNumber=2, recalcTimestamp=False)
assert font['name'].getDebugName(1) == 'Noto Sans CJK SC'
source_names = {str(i): font['name'].getDebugName(i) for i in (0, 7, 8, 9, 13, 14)}
available = set(font.getBestCmap())
source_text = ''.join(p.read_text(encoding='utf-8') for p in FILES)
cjk = lambda n: 0x3400 <= n <= 0x9fff or 0xf900 <= n <= 0xfaff or 0x20000 <= n <= 0x3134f
punct = lambda n: n == 0xb7 or 0x2000 <= n <= 0x206f or 0x3000 <= n <= 0x303f or 0xff00 <= n <= 0xffef
required = set(range(0x20, 0x7f)) | {ord(c) for c in source_text if cjk(ord(c)) or punct(ord(c))}
# Preserve the UI's supported arrows/typographic symbols as well, without adding emoji.
required |= {ord(c) for c in source_text if 0x2190 <= ord(c) <= 0x27ff and ord(c) in available}
missing_source = sorted(required - available)
assert not missing_source, f'Source font lacks required characters: {missing_source}'
options = subset.Options()
options.hinting = False
options.layout_features = []
options.name_IDs = ['*']
options.name_legacy = True
options.name_languages = ['*']
options.recalc_timestamp = False
subsetter = subset.Subsetter(options=options)
subsetter.populate(unicodes=required)
subsetter.subset(font)

# Use a new primary family/PostScript name for this modified font. Copyright and
# OFL license name records remain unchanged.
names = font['name']
replacement = {1:FAMILY, 2:'Regular', 3:'AshenQACJK-20261119-Regular', 4:FAMILY+' Regular',
               6:POSTSCRIPT, 16:FAMILY, 17:'Regular', 18:FAMILY+' Regular', 21:FAMILY, 22:'Regular'}
for record in list(names.names):
    if record.nameID in replacement:
        names.setName(replacement[record.nameID], record.nameID, record.platformID, record.platEncID, record.langID)
for platform, encoding, language in [(3,1,0x409),(1,0,0)]:
    for name_id in (1,2,3,4,6,16,17):
        names.setName(replacement[name_id],name_id,platform,encoding,language)
if 'CFF ' in font:
    cff=font['CFF '].cff
    cff.fontNames=[POSTSCRIPT]
    top=cff.topDictIndex[0]
    top.FamilyName=FAMILY
    top.FullName=FAMILY+' Regular'
output=HERE/'AshenQACJK.otf'
font.save(output)
check=TTFont(output)
actual=set(check.getBestCmap())
assert required <= actual, 'Subset lost a required glyph'
assert check['name'].getDebugName(1)==FAMILY
assert check['name'].getDebugName(6)==POSTSCRIPT
assert not any('Noto' in (check['name'].getDebugName(i) or '') for i in replacement)

# Preserve the OFL text from the installed package and both its upstream notice
# and the font's embedded copyright. Debian packaging GPL text is unrelated to
# the font outlines and is intentionally not copied as the font license.
package=COPYRIGHT.read_text(encoding='utf-8')
license_block=package.rsplit('\nLicense: SIL-1.1\n',1)[1].split('\nLicense: GPL-3+',1)[0]
license_text='\n'.join('' if line==' .' else line[1:] if line.startswith(' ') else line for line in license_block.splitlines()).strip()
notice=('Ashen QA CJK — modified subset for Ashen Age visual tests\n\n'
        'Original font: Noto Sans CJK SC Regular\n'
        'Embedded font copyright: '+source_names['0']+'\n'
        'Upstream package notice: Copyright 2010–2012, Google Corporation\n'
        'Upstream project: https://github.com/notofonts/noto-cjk\n'
        'The modified font remains under SIL Open Font License 1.1.\n\n')
(HERE/'OFL.txt').write_text(notice+license_text+'\n',encoding='utf-8')
report={
    'font':'AshenQACJK.otf','family':FAMILY,'postscript_name':POSTSCRIPT,
    'source_file':str(SOURCE),'source_face_index':2,'source_family':'Noto Sans CJK SC',
    'source_sha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
    'subset_sha256':hashlib.sha256(output.read_bytes()).hexdigest(),
    'bytes':output.stat().st_size,'required_characters':len(required),
    'cjk_characters':sum(cjk(n) for n in required),'mapped_characters':len(actual),
    'missing_characters':[],'source_files':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in FILES},
    'unicode_codepoints':['U+%04X'%n for n in sorted(required)]
}
(HERE/'coverage.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k not in ('unicode_codepoints','source_files')},ensure_ascii=False,indent=2))
