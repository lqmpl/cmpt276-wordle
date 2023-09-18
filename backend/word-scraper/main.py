from bs4 import BeautifulSoup
import requests 
import model

url = 'https://www.bestwordlist.com/5letterwords.htm'
counter = 0 

try:
    r = requests.get(url)
    rawData = r.text
    soup = BeautifulSoup(rawData, 'html.parser') 
    words = soup.find(class_='mt') 

    for word in words.children:
        ##concat_str = f"{type(word)}{word}"
        if (word.name is None):
            str = word.string
            wordArray = str.split(' ')
            if (len(wordArray) > 1):
                for i in wordArray:
                    if (i != ''):
                        print(i)
                        model.setKey(i, 0) 
                else: 
                    if (i != ''):
                        model.setKey(wordArray[0], 0)
except Exception as e: 
    print(e) 

