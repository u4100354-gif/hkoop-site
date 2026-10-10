import urllib.request, urllib.error
base='http://localhost:3100'
def get(p, host2=None):
    url=(host2 or base)+p
    req=urllib.request.Request(url, headers={'User-Agent':'audit-probe'})
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            b=r.read()
            return r.status, dict(r.headers), b
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers or {}), e.read()[:2000]
    except Exception as e:
        return -1, {}, str(e).encode()
for p in ['/search-index.json', '/docs/politika.pdf', '/docs/plan-raboty-2026.pdf', '/.env.example', '/package.json']:
    s,h,b = get(p)
    print(p, '=>', s, 'CT:', h.get('Content-Type'), 'LEN:', len(b) if isinstance(b,bytes) else b)
s,h,b = get('/', host2='http://127.0.0.1:8081')
txt = b[:600].decode('utf-8','replace').replace(chr(10),' ') if isinstance(b,bytes) else b
print('PMA / =>', s, txt[:300])
