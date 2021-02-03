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

### 대표적인 정제 방법

bs4를 통해 파싱된 beautifulsoup객체에서 원하는 태그의 데이터만 가져올 두가지 대표적인 방법

#### select

```python
data = soup.select('div > span.color')
```

div직계 자손중 color 클래스를 가진 span 태그를 하게된다.
css의 선택자를 통해 가져오는 방식임으로 가장 편리하게 가져올 수 있다.

#### findAll, find

```python
# 아래처럼 여러가지 속성이 있으나 태그와 속성정도만 거의 사용되는 것 같다.
data = soup.find_all(tag, attributes, recursive, text, limit, keywords)

# 해당 태그 전체를 탐색
bs.find_all('a')
```

명시적으로 함수에 원하는 태그와 클래스 명을 입력하여 찾는 방식이다. 이외에도 매우 다양한 함수들이 존재하며 예로 원하는 텍스트의 부모로 접근 형제 접근 등 html문서의 **DOM트리** 구조에 따라 쉽게 접근하는 방법이 많다. [공식문서](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#calling-a-tag-is-like-calling-find-all)

### 예외처리

```python
from urllib.error import HTTPError, URLError
from urllib.request import urlopen
from bs4 import BeautifulSoup

url="https://www.acmicpc.net/workbook/view/5078"


try:
    with urlopen(url) as f:
        # http응답 객체
        print(f) # <http.client.HTTPResponse object at 0x103c51490>
except HTTPError as e:
    print(e)
except URLError as e:
    print('server could not be found')

```

- HTTPError
  HTTP상태코드가 400번대 혹은 500번대로 에러상황시 발생하는 상태코드
- URLError
  url에 오타가 있거나 서버가 없는경우 HTTP상태코드를 아예 받지 못하는 경우 발생
  dns자체가 존재하지 않는 서버이면 뜹니다.
- AttributeError : bs4로 태그에 접속했을 때 없는 태그이면 None이 출력 되는데 그때 뜨는 예외

### 현재 까지

- solved.ac가 크롬 익스텐션으로 설치해야 보이는 부분이라서 python내장 request로 해당 부분 까지 가져와 지지 않음
- solved.ac를 크롤링 하면 될듯?
- standard라는 표시가된 문제가 있는데 어느정도 기준이 있는 표준문제인줄 알았지만 그런거 같진 않음 한번 같이 봐야할듯
- 현재까지 생각으론 문제 시도 횟수가 많을 수록 풀어볼 의미가 있다고 생각이 듦
- chrome 익스텐션이 적용된 페이지를 크롤링 할 수 있다면 단계별로 hidden이 적용된 태그가 있음 해당 태그엔 난이도가 정수형태의 수치로 생성되어있음으로 그대로 난이도 적용 하면 될듯 함
- selenium : 브라우저를 띄어주고 화면에서 스크롤, 키이벤트 등등 동작을 실행 할 수 있도록 도와주는 프레임 워크이다.