"""把已落盘的预览图路径写回 风格挑选.html 的 img 字段。
只填空值：已有 img 的条目一个都不动。
"""
import json, re, os, sys

sys.stdout.reconfigure(encoding='utf-8')
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
HTML = os.path.join(ROOT, '风格挑选.html')

s = open(HTML, encoding='utf-8').read()
m = re.search(r'(<script id="data" type="application/json">)(.*?)(</script>)', s, re.S)
data = json.loads(m.group(2))
added = 0
still = []
for e in data['entries']:
    if e.get('img'):
        continue
    dest = os.path.join(ROOT, e['file'].replace('.md', '.jpg'))
    if os.path.exists(dest):
        e['img'] = e['file'].replace('.md', '.jpg')
        added += 1
    else:
        still.append(e['id'])

payload = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
s2 = s[:m.start(2)] + payload + s[m.end(2):]
open(HTML, 'w', encoding='utf-8').write(s2)

total = len(data['entries'])
withimg = sum(1 for e in data['entries'] if e.get('img'))
print(f'回填 {added} 条；现在有图的 {withimg} / {total}；仍缺图 {len(still)} 条：{",".join(still) if still else "无"}')
