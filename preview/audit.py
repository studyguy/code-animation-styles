import os, sys, glob, json
from PIL import Image, ImageStat

sys.stdout.reconfigure(encoding='utf-8')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'out')
rows = []
for f in sorted(glob.glob(os.path.join(OUT, '*.jpg'))):
    if os.path.basename(f).startswith('sheet'):
        continue
    im = Image.open(f).convert('RGB')
    w, h = im.size
    small = im.resize((160, 90))
    stat = ImageStat.Stat(small)
    lum = [0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2] for p in small.getdata()]
    mean = sum(lum) / len(lum)
    var = sum((x - mean) ** 2 for x in lum) / len(lum)
    sd = var ** 0.5
    colors = len(small.getcolors(160 * 90) or [])
    # 与左上角背景色的差异像素比例
    bg = small.getpixel((2, 2))
    diff = sum(1 for p in small.getdata() if abs(p[0]-bg[0]) + abs(p[1]-bg[1]) + abs(p[2]-bg[2]) > 24) / (160 * 90)
    kb = round(os.path.getsize(f) / 1024)
    flags = []
    if (w, h) != (1280, 720): flags.append('尺寸')
    if sd < 8: flags.append('过平')
    if colors < 64: flags.append('色太少')
    if diff < 0.03 or diff > 0.97: flags.append('空白/纯色')
    if kb < 15: flags.append('文件过小')
    rows.append(dict(id=os.path.basename(f)[:-4], w=w, h=h, kb=kb,
                     sd=round(sd, 1), colors=colors, ink=round(diff * 100, 1), flags=flags))

print(f"{'ID':4}{'尺寸':>10}{'KB':>6}{'明度σ':>8}{'颜色':>7}{'非背景%':>9}  结论")
bad = 0
for r in rows:
    verdict = '通过' if not r['flags'] else '需修: ' + ','.join(r['flags'])
    if r['flags']: bad += 1
    print(f"{r['id']:4}{r['w']}x{r['h']:<5}{r['kb']:>6}{r['sd']:>8}{r['colors']:>7}{r['ink']:>9}  {verdict}")
print(f"\n{len(rows)} 张，{len(rows)-bad} 通过，{bad} 需修")
json.dump(rows, open(os.path.join(OUT, 'audit.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
