import urllib.request, urllib.error, re
base='http://localhost:3100'
def get(p):
    url=base+p
    req=urllib.request.Request(url, headers={'User-Agent':'audit-probe'})
    with urllib.request.urlopen(req, timeout=10) as r:
        b=r.read().decode('utf-8','replace')
        return r.status, dict(r.headers), b
s, h, b = get('/search?q=%3Cscript%3Ealert(1)%3C%2Fscript%3E')
print('SEARCH raw-script-reflected:', '<script>alert(1)' in b)
i = b.find('alert(1)')
print('SEARCH ctx:', b[max(0,i-200):i+200].replace(chr(10),' ') if i>=0 else 'not-found-in-body')
s,h,b2 = get('/news/nonexistent-xyz-123')
nn = 'Не найдено' in b2
print('NEWS404 has-nenaideno:', nn)
print('NEWS404 leaks:', bool(re.search(r'at |Error:|STACK|Exception|mysql', b2, re.I)))
s,h,b3 = get('/')
print('X-Powered-By:', h.get('X-Powered-By'))
for k in ['Content-Security-Policy','X-Frame-Options','X-Content-Type-Options','Referrer-Policy','Strict-Transport-Security','Cache-Control']:
    print('HDR '+k+':', h.get(k))
print('YM in home:', 'mc.yandex.ru' in b3)
s,h,b4 = get('/news/%2e%2e%2f..%2fetc%2fpasswd')
print('TRAVERSAL nenaideno:', 'Не найдено' in b4)
print('TRAVERSAL leaks:', bool(re.search(r'etc/passwd|root:|Exception|mysql', b4, re.I)))
try:
    s,h,b5 = get('/.env.local')
    print('ENV status', s)
except urllib.error.HTTPError as e:
    print('ENV http', e.code)
s,h,b6 = get('/search?q='+urllib.parse.quote('\" autofocus onfocus=alert(1) x=\"'))
print('ATTRBREAK reflected raw:', 'autofocus onfocus' in b6)
j = b6.find('autofocus')
print('ATTRBREAK ctx:', b6[max(0,j-200):j+200].replace(chr(10),' ') if j>=0 else 'not-found')
s,h,b7 = get('/docs')
print('DOCS politika-link:', '/docs/politika.pdf' in b7)
s,h,b8 = get('/contacts')
print('CONTACTS has-address:', 'Муравьева' in b8 or 'Муравьёва' in b8)
print('CONTACTS has-mailto:', 'mailto:' in b8)
