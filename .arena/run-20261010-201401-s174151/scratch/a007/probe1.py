import urllib.request, urllib.error
def get(url):
    try:
        r = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent':'audit'}), timeout=8)
        return (r.status, dict(r.headers), r.read())
    except urllib.error.HTTPError as e:
        return (e.code, dict(e.headers), e.read())
    except Exception as e:
        return ('ERR', {}, repr(e).encode())

for u in ['http://127.0.0.1:8081/', 'http://127.0.0.1:8081/phpmyadmin/']:
    st, h, b = get(u)
    print(u, st)
    print(str(h)[:400])

r = urllib.request.urlopen(urllib.request.Request('http://localhost:3100/', headers={'User-Agent':'audit'}), timeout=8)
t = r.read().decode('utf-8', 'replace')
print('YM_PRESENT=', 'mc.yandex.ru' in t)
print('COOKIE=', 'hkoop-cookie' in t)
print('TARGET_BLANK=', t.count('target="_blank"'), 'NOREF=', t.count('noreferrer'), 'NOOPENER=', t.count('noopener'))
print('IFRAME=', t.count('<iframe'))
idx = t.find('ym(')
print('YMCTX=', t[idx-50:idx+150] if idx >= 0 else 'NO_YM_CALL')
c = urllib.request.urlopen(urllib.request.Request('http://localhost:3100/contacts', headers={'User-Agent':'audit'}), timeout=8).read().decode('utf-8','replace')
print('CONTACTS_IFRAME=', c.count('<iframe'), 'MAP=', 'yandex.ru/map-widget' in c)
