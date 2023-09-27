import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

def setKey(key, value):
    try:
        r.set(key, value) 
    except Exception as e:
        print(e) 