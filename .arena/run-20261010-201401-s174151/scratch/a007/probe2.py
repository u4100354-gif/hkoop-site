import os, re
# read env locally, never print secrets
env = {}
for fn in [r'C:\Users\speed\OneDrive\Документы\Проект по умолчанию\hkoop-site\.env.local',
           r'C:\Users\speed\OneDrive\Документы\Проект по умолчанию\hkoop-site\.env.example']:
    try:
        t = open(fn, encoding='utf-8', errors='replace').read()
        print('FILE=', fn, 'LEN=', len(t), 'KEYS=', re.findall(r'^[A-Z_]+(?==)', t, re.M))
    except Exception as e:
        print('FILE=', fn, 'ERR=', e)
try:
    import pymysql
    print('HAS_PYMYSQL=1')
except Exception as e:
    print('HAS_PYMYSQL=0', e)
try:
    import mysql.connector
    print('HAS_MYSQL_CONNECTOR=1')
except Exception as e:
    print('HAS_MYSQL_CONNECTOR=0', e)
