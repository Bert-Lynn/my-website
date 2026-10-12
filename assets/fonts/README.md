# Local display typeface

Growth Song is a renamed, glyph-subsetted **Noto Serif CJK SC Regular 2.003**. It is used only for prominent Chinese headings, chapter numbers, and decorative cover text. Body text and controls retain the system sans-serif stack. The font uses `font-display: swap`; system Song/Ming faces and then `serif` remain available if the download fails.

- Upstream: https://github.com/notofonts/noto-cjk
- Original family/file: `NotoSerifCJK-Regular.ttc`, Simplified Chinese face (index 2)
- Embedded source version: `Version 2.003;hotconv 1.1.1;makeotfexe 2.6.0`
- Font copyright: © 2017–2024 Adobe (http://www.adobe.com/).
- Official license: https://github.com/notofonts/noto-cjk/blob/main/Serif/LICENSE
- License: SIL Open Font License 1.1. The full license and copyright notice are in `LICENSE.txt`. The subset is distributed under that same license, without claiming endorsement.

The font is self-hosted; no external font requests are made. The WOFF is roughly 550 KB. The font subset includes the characters in the public page and course sources as well as the decorative chapter labels; characters added later fall back naturally until it is rebuilt.

To reproduce, obtain the original version 2.003 TTC from the upstream project, install fontTools through the normal package registry, and run:

`python scripts/build-display-font.py /path/to/NotoSerifCJK-Regular.ttc`

The script reads only public source files. It never reads user progress, creates application records, or contacts a server.
