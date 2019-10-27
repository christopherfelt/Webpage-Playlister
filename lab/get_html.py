import urllib.request

html = urllib.request.urlopen('https://www.youtube.com/watch?v=B7ooR2GF--I&feature=youtu.be')

encode = html.headers.get_content_charset()

text = html.read().decode(encode)

find_body = text.find('</body>')
html_length = len(text)

index = (html_length-find_body)*-1

new_html = text[:index]+ '<script src="get_click_element2.js"></script>' + text[index:]

file = open('new_music1.html', 'wb')
file.write(new_html.encode(encode))
file.close()
