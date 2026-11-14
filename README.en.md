# Code Animation Style Prompts (English)

**341 visual styles for making animation with code**, each with a ready-to-use prompt. 333 styles have preview images; 31 motion styles also link to original films.

**Browse online:** https://studyguy.github.io/code-animation-styles/ — the picker has a full English UI (top-right **English** button).

> The picker also works offline: just open `风格挑选.html` in Chrome or Edge. All prompts are embedded in that one file.

## How to use

1. Open the picker, filter by series / category / whether a still exists, or search ("ink", "retro", "M8" — both languages work).
2. Click any preview: the detail modal shows the image on the left and the **full prompt**, fit notes, director notes and references on the right (scrollable box, one-click copy).
3. Tick the styles you like, hit **Picks**, copy the list, and send it to your AI together with what you want to make.
4. Ask it to output a browser-ready HTML, then render that to video.

The more specific the prompt (locked colours, timing, camera), the closer different models get. Placeholders like `{{ }}` are yours to fill.

## What's inside

| Path | Count | What |
|---|---|---|
| `风格提示词/` | 341 `.md` + 333 `.jpg` | One prompt per style, preview image next to it |
| `风格挑选.html` | 1.7 MB | Offline picker: filters, picks, detail modal, export list (zh/en) |
| `preview/` | — | The preview-image pipeline (Canvas rendering + headless Chrome + audit scripts) |
| `说明.md` | — | Full usage notes (Chinese) |
| `许可与来源.md` | — | Sources and licensing per series |

Series: A–G code stills 26 · M motion styles 40 · K cartoon styles 38 · Z Chinese styles 15 · H ready layouts 12 · L Lemo-Opuscar 59 · V mg-styles-15 15 · X code-video 31 · R from references 7 · O Oscar 98 98.

## Where the previews come from

- Original stills were shipped with their projects.
- **140 images were generated here**: rendered with Canvas 2D following each style's own prompt, captured via headless Chrome. Scripts included:

```bash
cd preview
node render.js M5 K22        # render given entries
python audit.py              # quality gate
python install.py            # install into the library (never overwrites)
```

- The 31 M-series styles link to **original films on prompt-motion.com** — the "▶ Watch" button embeds the original page; no video is stored here.

## Licence

Free to use and to share freely; **do not package this into paid courses or paid skills**. Some styles come from open-source projects — keep their original licences and attribution (see `许可与来源.md`, Chinese). The linked films belong to [prompt-motion.com](https://prompt-motion.com) and their authors.
