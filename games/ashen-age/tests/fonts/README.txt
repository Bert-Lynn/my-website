Ashen QA CJK — offline visual-test font

Scope
  CI and local screenshot verification only. Do not add this font to production
  CSS. The tests directory is excluded from the deployed game artifact.

Source
  Noto Sans CJK SC Regular, face 2 of the installed collection:
  /usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc
  Upstream: https://github.com/notofonts/noto-cjk
  Source SHA-256:
  b76b0433203017ca80401b2ee0dd69350349871c4b19d504c34dbdd80541690a
  License text was read from /usr/share/doc/fonts-noto-cjk/copyright.
  Font metadata copyright: © 2014–2021 Adobe (http://www.adobe.com/).
  Package upstream copyright notice: 2010–2012 Google Corporation.
  The original notices and full SIL Open Font License 1.1 are in OFL.txt.

Modifications
  FontTools 4.61.1 extracted the Simplified Chinese face and subsetted it to
  CJK characters and relevant punctuation found in index.html, main.js,
  environment.js and style.css, plus printable ASCII and supported UI arrows.
  Hinting and optional OpenType layout features were removed for this static
  horizontal UI test subset. The font family, full and PostScript names were
  changed to Ashen QA CJK / AshenQACJK-Regular. The CFF internal names were also
  changed. Copyright and OFL metadata are preserved. This is a modified font;
  the original authors do not endorse it.

Verification
  Size: 102,684 bytes (about 100.3 KiB).
  Maps all 583 required codepoints, including 474 CJK characters; no missing
  required characters. coverage.json records source hashes, font hashes and
  the exact codepoint list. fc-scan recognizes the new family and style.
  Emoji and characters outside the test subset continue to use system fonts.

Install in a Linux CI job before launching Chromium
  mkdir -p "$HOME/.local/share/fonts/ashen-qa"
  cp games/ashen-age/tests/fonts/AshenQACJK.otf "$HOME/.local/share/fonts/ashen-qa/"
  fc-cache -f "$HOME/.local/share/fonts/ashen-qa"
  fc-match ':lang=zh-cn'

  Use a fontconfig-discovered directory as above. An arbitrary RUNNER_TEMP
  folder passed to fc-cache alone is not necessarily in fontconfig's search
  configuration and may therefore not be selected by Chromium.

Rebuild offline on a machine with the same installed source collection
  python games/ashen-age/tests/fonts/build-subset.py
  The script verifies the SC face and all glyph coverage, renames the subset,
  and rewrites the font, coverage manifest and OFL license notice. FontTools
  is a build-time dependency only; Chromium needs only the finished OTF.
