"""把 preview/out/<ID>.jpg 复制到风格库对应路径。
规则：目标路径 = 条目的 file 字段把 .md 换成 .jpg（与既有命名一致）。
保护：目标已存在则跳过，绝不覆盖已有预览图。
用法：python install.py [--dry]
"""
import json, re, os, sys, shutil

sys.stdout.reconfigure(encoding='utf-8')
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(HERE, 'out')
HTML = os.path.join(ROOT, '风格挑选.html')
dry = '--dry' in sys.argv

s = open(HTML, encoding='utf-8').read()
data = json.loads(re.search(r'<script id="data" type="application/json">(.*?)</script>', s, re.S).group(1))
E = data['entries']

copied, skipped, missing_src, already = 0, 0, 0, 0
for e in E:
    src = os.path.join(SRC, e['id'] + '.jpg')
    dest = os.path.join(ROOT, e['file'].replace('.md', '.jpg'))
    if not os.path.exists(src):
        missing_src += 1
        continue
    if os.path.exists(dest):
        already += 1          # 已有预览图，受保护
        continue
    if dry:
        print('COPY', e['id'], '->', os.path.relpath(dest, ROOT))
        copied += 1
    else:
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        shutil.copyfile(src, dest)
        copied += 1

print()
print(('（演练）' if dry else '') + f'安装 {copied} 张；已有图受保护跳过 {already} 张；out 里没有对应文件 {missing_src} 条')
