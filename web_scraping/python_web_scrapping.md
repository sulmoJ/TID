## python web scrapping

파이썬으로 웹 스크랩핑을 하기위해서 정리한 글입니다.

### 현재까지 사용된 라이브러리

- urllib (python 내장)
- beautifulsoup4
- html 파서 라이브러리
  - html5lib
  - lxml
  - html

### 기본적인 스크랩핑 순서

1. GET요청을 통해 데이터 원하는 페이지의 문서 가져오기
2. 문자열 형태의 HTML소스를 dom트리 형태로 파싱하기
3. 원하는 데이터 선택하여 정제하기

#### 예시 코드

```python
from urllib import request
from bs4 import BeautifulSoup

url="https://www.acmicpc.net/workbook/view/5078"
with request.urlopen(url) as f:
    # http응답 객체
    print(f) # <http.client.HTTPResponse object at 0x103c51490>
    print("----------------------")
    html = f.read()


print(html) # b'' 형태의 html데이터
print("----------------------")

soup = BeautifulSoup(html, 'html.parser')

print(soup) # html 형식으로 파싱 된 문자열을 default로 가진 bs4 객체
print("----------------------")

problem_title = soup.select('tr > td:nth-child(2) > a')

for i in problem_title:
    print(i.text)
```

- urllib.request.urlopen
  - get 요청을 통해 원하는 정보를 가진 서버로부터 http 응답객체를 받는다.
  - 여기선 일반적인 웹 통신처럼 브라우저가 get요청으로 html을 가져오는 것 처럼 해당 라이브러리로 html, css, js등 정보를 가져온다.
- beautifulsoup4
  - 응답 받은 데이터(일반적인 바이트스트림)를 bs4객체로 만든다.
  - bs4객체가 가진 메소드
    - 바이트스트림을 html DOM트리의 형태로 파싱한다.
    - css선택자를 활용해 원하는 요소에 접근해 데이터를 분리 시켜준다.
    - 그외 많은것 같은데 일단 간단히 여기까지 알아봤으며 나머지는 [공식문서](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)를 참조
- html.parser
  - bs4가 html문서로 파싱할때 사용되는 구문분석기이다.
  - python설치시 같이 설치되는 내장 클래스이다.
- html5lib
  - bs4가 html문서로 파싱할때 사용되는 구문분석기이다.
  - html.parser, lxml 보다 많은 에러를 커버가능하며 일반적인 속도를 가짐
  - 설치필요
- lxml
  - bs4가 html문서로 파싱할때 사용되는 구문분석기이다.
  - 가장 빠른 속도의 구문분석기이다.
  - 지저분한 html코드(태그가 안닫혀있거나 계층구조가 잘못되었거나 등등)에 일일히 멈추지않고 진행
  - 설치 필요
