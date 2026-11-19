# Ashen Age asset provenance

The game uses Three.js r170 (MIT license) and genuine glTF skinned character
meshes. All files are served from the same deployed site. `assets-manifest.json`
pins upstream downloads by SHA-256; the build verifies each file and fails rather
than silently replacing a required character with a primitive.

## Third-party assets

| Used for | Primary source | License and changes |
| --- | --- | --- |
| Hero knight | https://vibeassets.io/a/lvj49vzlzd | CC0 as declared by the asset publisher; embedded textures resized to at most 1024 pixels; original skin geometry and hierarchy preserved. |
| Garrick | https://vibeassets.io/a/9h7odik5fl | CC0; original 24-joint rig, independently cloned materials and animation controller. |
| Mira and hooded Lyra | https://vibeassets.io/a/k6bdm27lba | CC0; Lyra currently shares this hooded body with a green tint and a bow. This is not a unique elf character model. |
| Idle, Walk, Run animation data | https://vibeassets.io/a/y4hvexuc4t | CC0; extracted animation rotations, converted to in-place movement, preserving target character bone lengths. Donor mesh is not used or downloaded by the game. |
| Three.js r170 | https://github.com/mrdoob/three.js/tree/r170 | MIT; license deployed at `vendor/LICENSE`. |

Publisher license pages were checked on 2026-11-19. These are primary asset and
software sources, not research papers. No research-performance claims are made.

`assets/motions.json` contains the extracted locomotion keyframes. Attack, Cast,
and Dodge are original joint animation clips authored in `characters.js`, with
one-shot playback and crossfades. They are not claimed to be motion capture.

## Original art and game code

The buildings, terrain, foliage, material textures, props, sky, weapons, wolf
meshes, interfaces, combat and social systems are procedural/code assets authored
for this game. Canvas2D is used only to produce material maps and text labels;
the world and characters are rendered using Three.js WebGL geometry and skinning.

## Validation

`tests/smoke.cjs` exercises actual keyboard, pointer and UI inputs in Chromium and
reads the optional `?qa=1` DOM diagnostics. The diagnostics expose observations
only, not teleportation or game-state mutation APIs. QA sessions do not modify
the user's local save. `tests/characters.html` is an isolated visual inspection
page for gait, silhouette and strike poses.

Tests and source/build tooling are removed from the production Pages artifact.
