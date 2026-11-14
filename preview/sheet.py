import os, sys, glob, re
from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'out')
NAMES = {
    'V1': 'V1 逐帧手绘', 'V2': 'V2 等距 2.5D', 'V3': 'V3 扁平矢量', 'V4': 'V4 线条画',
    'V5': 'V5 3D 渲染', 'V6': 'V6 形变', 'V7': 'V7 贴纸讲解', 'V8': 'V8 赛博 HUD',
    'V9': 'V9 拼贴', 'V10': 'V10 极光毛玻璃', 'V11': 'V11 包豪斯', 'V12': 'V12 合成波',
    'V13': 'V13 像素', 'V14': 'V14 液态', 'V15': 'V15 综艺花字',
    'X1': 'X1 手绘 8-bit', 'X2': 'X2 品牌动态', 'X3': 'X3 沙画', 'X4': 'X4 歌词 MV',
    'X5': 'X5 卡点剪辑', 'X6': 'X6 界面形变', 'X7': 'X7 英雄漫画', 'X8': 'X8 手账',
    'X9': 'X9 撕纸拼贴', 'X10': 'X10 粒子', 'X11': 'X11 翻牌板', 'X12': 'X12 霓虹灯牌',
    'X13': 'X13 16-bit 街机', 'X14': 'X14 CRT', 'X15': 'X15 热敏小票', 'X16': 'X16 地铁图',
    'X17': 'X17 蓝图', 'X18': 'X18 漫画书', 'X19': 'X19 纪录片', 'X20': 'X20 博物馆',
    'X21': 'X21 突发新闻', 'X22': 'X22 线索板', 'X23': 'X23 绘本', 'X24': 'X24 RPG',
    'X25': 'X25 天气预报', 'X26': 'X26 电视购物', 'X27': 'X27 体育直播', 'X28': 'X28 说明书',
    'X29': 'X29 白板讲课', 'X30': 'X30 电影预告', 'X31': 'X31 数学证明',
    'H2': 'H2 BlockFrame', 'Z5': 'Z5 剪纸', 'K22': 'K22 折纸', 'M1': 'M1 白板',
}
ORDER = ['V1','V2','V3','V4','V5','V6','V7','V8','V9','V10','V11','V12','V13','V14','V15',
         'X1','X2','X3','X4','X5','X6','X7','X8','X9','X10','X11','X12','X13','X14','X15','X16',
         'X17','X18','X19','X20','X21','X22','X23','X24','X25','X26','X27','X28','X29','X30','X31',
         'H1','H2','H3','H4','H5','H6','H7','H8','H9','H10','H11','H12',
         'Z1','Z2','Z3','Z4','Z5','Z6','Z7','Z8','Z9','Z10','Z11','Z12','Z13','Z14','Z15',
         'K1','K2','K3','K4','K5','K6','K7','K8','K9','K10','K11','K12','K13','K14','K15','K16','K17','K18','K19','K20','K21','K22','K23','K24','K25','K26','K27','K28','K29','K30','K31','K32','K33','K34','K35','K36','K37','K38',
         'M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12','M13','M14','M15','M16','M17','M18','M19','M20','M21','M22','M23','M24','M25','M26','M27','M28','M29','M30','M31','M32','M33','M34','M35','M36','M37','M38','M39','M40']

files = {os.path.basename(f)[:-4]: f for f in glob.glob(os.path.join(OUT, '*.jpg'))
         if not os.path.basename(f).startswith('sheet')}
ids = [i for i in ORDER if i in files]
if not ids:
    ids = sorted(files)

TW, TH = 372, 209
PAD, GAP, LABEL = 18, 12, 26
COLS = 5
rows = (len(ids) + COLS - 1) // COLS
W = PAD * 2 + COLS * TW + (COLS - 1) * GAP
H = PAD * 2 + 26 + rows * (TH + LABEL + 6) + (rows - 1) * GAP
canvas = Image.new('RGB', (W, H), '#141413')
d = ImageDraw.Draw(canvas)
try:
    font = ImageFont.truetype('C:/Windows/Fonts/msyh.ttc', 15)
    font_s = ImageFont.truetype('C:/Windows/Fonts/msyh.ttc', 12)
except Exception:
    font = font_s = ImageFont.load_default()
d.text((PAD, 10), f'预览批量 · {len(ids)} 张', font=font, fill='#ecebe6')

for i, sid in enumerate(ids):
    r, col = divmod(i, COLS)
    x = PAD + col * (TW + GAP)
    y = 36 + r * (TH + LABEL + 6 + GAP)
    im = Image.open(files[sid]).convert('RGB').resize((TW, TH), Image.LANCZOS)
    canvas.paste(im, (x, y))
    d.text((x, y + TH + 4), NAMES.get(sid, sid), font=font_s, fill='#ecebe6')

out = os.path.join(OUT, 'sheet.jpg')
canvas.save(out, quality=86)
print('拼版:', out, canvas.size, len(ids), '张')
