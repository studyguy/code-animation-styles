"""把每条的「风格提示词」正文提取出来，内联进 HTML 的 JSON。
分系列规则（.md 排版不统一）：
  V   → ## 提示词 下的 ```text 代码块
  其它 → ## 风格提示词 到 ## 补充 之前；开头的 > 引用说明去掉
只覆盖提示词正文，不动 extra / img / videos。
"""
import json, re, os, sys

sys.stdout.reconfigure(encoding='utf-8')
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
HTML = os.path.join(ROOT, '风格挑选.html')


def extract(e):
    t = open(os.path.join(ROOT, e['file']), encoding='utf-8').read()
    if e['s'] == 'V':
        m = re.search(r'^## 提示词[ \t]*$\s*```(?:text)?\s*\n(.*?)\n```', t, re.S | re.M)
        body = m.group(1) if m else ''
    else:
        m = re.search(r'^## 风格提示词[ \t]*$(.*?)(?=^## 补充[ \t]*$|\Z)', t, re.S | re.M)
        body = m.group(1) if m else ''
    body = body.strip()
    # 去掉开头那句「> 这一条的提示词是重新写过的详细版…」
    body = re.sub(r'^>\s*这一条的提示词[^\n]*\n+', '', body)
    return body.strip()


s = open(HTML, encoding='utf-8').read()
m = re.search(r'(<script id="data" type="application/json">)(.*?)(</script>)', s, re.S)
data = json.loads(m.group(2))

empty, total = [], 0
for e in data['entries']:
    body = extract(e)
    if not body:
        empty.append(e['id'])
    e['prompt'] = body
    total += len(body)

payload = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
out = s[:m.start(2)] + payload + s[m.end(2):]
open(HTML, 'w', encoding='utf-8').write(out)

print(f'内联提示词 {len(data["entries"])} 条，共 {total} 字符（{total/1024:.0f} KB）')
print(f'提取为空 {len(empty)} 条：{",".join(empty) if empty else "无"}')
print(f'HTML 现在 {(len(out)/1024):.0f} KB')
