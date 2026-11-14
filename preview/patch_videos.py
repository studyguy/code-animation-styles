"""把条目「参考」里的 prompt-motion 链接写回 JSON 的 videos 字段。
只加字段，不动 img / 其他内容。
"""
import json, re, os, sys

sys.stdout.reconfigure(encoding='utf-8')
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
HTML = os.path.join(ROOT, '风格挑选.html')

s = open(HTML, encoding='utf-8').read()
m = re.search(r'(<script id="data" type="application/json">)(.*?)(</script>)', s, re.S)
data = json.loads(m.group(2))


def flat(v):
    return ' '.join(str(x) for x in v) if isinstance(v, list) else str(v or '')


added = 0
for e in data['entries']:
    urls = []
    for x in (e.get('extra') or []):
        txt = flat(x.get('t'))
        for label, url in re.findall(r'\[([^\]]+)\]\((https?://[^)\s]+)\)', txt):
            if 'prompt-motion.com' in url:
                urls.append({'t': label, 'u': url})
    if not urls:
        continue
    seen, uniq = set(), []
    for x in urls:
        if x['u'] in seen:
            continue
        seen.add(x['u'])
        uniq.append(x)
    e['videos'] = uniq
    e['video'] = uniq[0]['u']
    e['videoName'] = uniq[0]['t']
    added += 1

payload = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
out = s[:m.start(2)] + payload + s[m.end(2):]
open(HTML, 'w', encoding='utf-8').write(out)
print(f'写入 videos 字段 {added} 条')
for e in data['entries']:
    if e.get('videos'):
        print(f"  {e['id']:4} {len(e['videos'])} 个 · {e['videoName']}")
