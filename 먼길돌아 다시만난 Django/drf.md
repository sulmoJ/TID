# drf 시작

## Django Rest Framework

장고를 rest api로 사용합니다. 퓨어장고와 다르게 프론트 영역인 템플릿이 빠지게 되고 restAPI를 생성합니다.

기존 장고와 다르게 HttpResponse할때 HTML문서로 반환하는 방식이 아니라 HTTP프로토콜에 맞게 디자인된 REST라는 아키텍처를 통해 통신하여 json이라는 파일형식에 맞게 데이터를 담아 전송합니다.

[DRF공식문서](https://www.django-rest-framework.org/tutorial/1-serialization/) 를 참고하여 정리했습니다.

### Serializer(직렬화)

가장 먼저 직렬화에대해서 설명합니다.

HTTP프로토콜을 통해 django 서버에 도착한 데이터의 형태(json)는 장고에서 python을 사용하여 만들수 있는 model의 형태와 다릅니다.

이 차이를 극복하기 위해 직렬화는 사용자(개발자)의 의도에 맞는 json데이터가 오면 이를 django 모델 형태와 맞게 변환시켜 직렬로 통신되게 만들어주는 것으로 이해를 해봤습니다.

[렌더링](#렌더링)

> 요청 >> json형식의 데이터 >> serializer >> model에 맞는 데이터 형식

[파싱](#파싱)

> model형식에 맞는 데이터 >> serializer >> json형식의 데이터 >> 응답

#### 기본 세팅

[DRF 공식 문서](https://www.django-rest-framework.org/tutorial/1-serialization/#setting-up-a-new-environment)에 있는 내용입니다.

- 가상환경 생성 : `python3 -m venv env`
- 가상환경 활성화
  - mac기준 : `source env/bin/activate`
  - window 기준 : `./env/Scripts/activate`
- django 와 drf 설치 : `pip install django djangorestframework`
- 프로젝트 생성할 위치로 이동 : `cd [원하는 위치]`
- 프로젝트 생성 : `django-admin startproject tutorial`
- 프로젝트로 위치 변경 : `cd tutorial`
- 앱 생성 : `python manage.py startapp snippets`
- 모델 작성

  ```python
  from django.db import models
  from pygments.lexers import get_all_lexers
  from pygments.styles import get_all_styles

  LEXERS = [item for item in get_all_lexers() if item[1]]
  LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
  STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])

  class Snippet(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  title = models.CharField(max_length=100, blank=True, default='')
  code = models.TextField()
  linenos = models.BooleanField(default=False)
  language = models.CharField(choices=LANGUAGE_CHOICES, default='python', max_length=100)
  style = models.CharField(choices=STYLE_CHOICES, default='friendly', max_length=100)

      class Meta:
          ordering = ['created']
  ```

- 데이터베이스 적용
  - `python manage.py makemigrations`
  - `python manage.py migrate`

#### Serializers 생성

해당 app에 serializers.py를 생성하고 아래의 예시 코드를 작성합니다.

```python
from rest_framework import serializers
from snippets.models import Snippet, LANGUAGE_CHOICES, STYLE_CHOICES


class SnippetSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    code = serializers.CharField(style={'base_template': 'textarea.html'})
    linenos = serializers.BooleanField(required=False)
    language = serializers.ChoiceField(choices=LANGUAGE_CHOICES, default='python')
    style = serializers.ChoiceField(choices=STYLE_CHOICES, default='friendly')

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Snippet.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.title = validated_data.get('title', instance.title)
        instance.code = validated_data.get('code', instance.code)
        instance.linenos = validated_data.get('linenos', instance.linenos)
        instance.language = validated_data.get('language', instance.language)
        instance.style = validated_data.get('style', instance.style)
        instance.save()
        return instance
```

세부적인 serializer 작성법은 추후 작성하겠습니다. 위의 코드는 직렬화를 설명하기위한 예시 코드입니다.

#### 렌더링과 파싱

python shell을 통해 데이터를 렌더링 하는 과정을 보입니다.

`python manage.py shell`

아래처럼 model, serializer, rest_framework모듈에 렌더와 파서를 불러옵니다. 그리고 스니펫 데이터를 2개 저장합니다.

```python
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

snippet = Snippet(code='foo = "bar"\n')
snippet.save()

snippet = Snippet(code='print("hello, world")\n')
snippet.save()
```

##### 렌더링

시리얼라이저를 통해 모델 객체의 스키마를 그대로 파이썬 딕셔너리 화 하였습니다.

```python
serializer = SnippetSerializer(snippet)
serializer.data
# 출력
# {'id': 2, 'title': '', 'code': 'print("hello, world")\n', 'linenos': False, 'language': 'python', 'style': 'friendly'}
```

위의 과정을 거친 딕셔너리 데이터로 response를 보내기위해 bytes타입의 json형식 데이터를 만들어줍니다.

```python
content = JSONRenderer().render(serializer.data)
content
# b'{"id": 2, "title": "", "code": "print(\\"hello, world\\")\\n", "linenos": false, "language": "python", "style": "friendly"}'
```

##### 파싱

렌더링의 과정을 거꾸로 가는과정입니다.

```python
import io

# 바이트타입의 content를 byteIO 객체로 바꿔줍니다. 이 객체에 정확한 속성은 모르나 파싱을 1회만 할 수 있었고 입출력 스트림에대해 더 공부해봐야 알것 같습니다.
stream = io.BytesIO(content)
# 바이트스트림 객체를 이제 파이썬의 딕셔너리 타입으로 전환해줍니다.
data = JSONParser().parse(stream)
```

```python
# 모델 인스턴스로 시리얼라이저를 통해 만들어줍니다.
serializer = SnippetSerializer(data=data)

# 데이터 타입의 유효성검사를 하고
serializer.is_valid()
# True

# 검증된 데이터값을 확인할 수 있습니다.
serializer.validated_data
# OrderedDict([('title', ''), ('code', 'print("hello, world")\n'), ('linenos', False), ('language', 'python'), ('style', 'friendly')])
serializer.save()
# <Snippet: Snippet object>
```

#### ModelSerializer

장고의 모델폼처럼 시리얼라이저도 메타클래스 옵션으로 쉽게 생성이 가능합니다. 하지만 커스텀을 위해 더 많은 문서를 봐야할것 같네요..

아래와 같이 코드의 길이가 매우 많이 줄어듭니다.

```python
class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ['id', 'title', 'code', 'linenos', 'language', 'style']
```

### Serializer를 사용한 view 작성

rest API에서 GET, POST, DELETE, PUT 4가지의 요청방식을 예로 작성 되었습니다.

```python
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer

@csrf_exempt
def snippet_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = SnippetSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def snippet_detail(request, pk):
    try:
        snippet = Snippet.objects.get(pk=pk)
    except Snippet.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = SnippetSerializer(snippet)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = SnippetSerializer(snippet, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        snippet.delete()
```
