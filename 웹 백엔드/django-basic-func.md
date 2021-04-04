Django version === 3.1로 작성되었습니다.

### sql query문 으로 변환

`python manage.py sqlmigrate polls 0001`

python manage.py sqlmigrate [ app이름 ] [ migrate 번호 ]

아래와 같은 장고 모델을

```python
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
```

아래와같이 sql문으로 변형된 모습을 보여줍니다.

```sql

BEGIN;
--
-- Create model Question
--
CREATE TABLE "polls_question" (
    "id" serial NOT NULL PRIMARY KEY,
    "question_text" varchar(200) NOT NULL,
    "pub_date" timestamp with time zone NOT NULL
    );
--
-- Create model Choice
--
CREATE TABLE "polls_choice" (
    "id" serial NOT NULL PRIMARY KEY,
    "choice_text" varchar(200) NOT NULL,
    "votes" integer NOT NULL,
    "question_id" integer NOT NULL
    );

ALTER TABLE "polls_choice"
    ADD CONSTRAINT "polls_choice_question_id_c5b4b260_fk_polls_question_id"
    FOREIGN KEY ("question_id")
    REFERENCES "polls_question" ("id")
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "polls_choice_question_id_c5b4b260" ON "polls_choice" ("question_id");
COMMIT;
```

## Django ORM (making query)

터미널에서 python shell을 열어줍니다.

`python manage.py shell`

### 장고에서 db에 접근하는 방법(문서에있는 기본적인 내용)

```python
# 모델 임포트
from polls.models import Choice, Question

# 시간정보를 가져오기위해 timezone 임포트
from django.utils import timezone
q = Question(question_text="What's new?", pub_date=timezone.now())
q.save()

# Now it has an ID.
q.id
# 1

# 해당 데이터에대한 객체적 접근이 가능하다

q.question_text
# "What's new?"

q.pub_date
# datetime.datetime(2012, 2, 26, 13, 0, 0, 775217, tzinfo=<UTC>)

# 데이터를 변경하고 save()함수를 통해 db의 내용을 변환도 가능하다.
q.question_text = "What's up?"
q.save()

# objects.all() displays all the questions in the database.
Question.objects.all()
# <QuerySet [<Question: Question object (1)>]>
```

추가적인 [자세한 정보](https://docs.djangoproject.com/en/3.1/topics/db/queries/)는 앞으로 사용하면서 더 추가하겠습니다.

### model에대한 객체정보를 쉽게 보기위한 방법

```python
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    # __str__ 함수는 python class에 기본 제공 문법으로 클래스로
    # 생성된 인스턴스 별로 이름을 부여한다. 이는 장고에서 admin page와
    # 여러 방면에서 객체에대한 구분을 쉽게 함으로 설정하면 협입시 좋을듯 하다.
    def __str__(self):
        return self.question_text
```

설정시 차이점

```python
# __str__ 작성 전
Question.objects.all()
# <QuerySet [<Question: Question object (1)>]>

# __str__ 작성 후
Question.objects.all()
# <QuerySet [<Question: What's new?>]>
```

### 추가

#### id로 data가져오기

`Question.objects.get(id=1)`

#### pk로 data가져오기

`Question.objects.get(pk=1)`

위와 같이 id 또는 pk를 통해 데이터를 가져올수 있는데 차이가 궁굼해서 잠시 찾아봤습니다.

큰차이는 없으나 의도에 맞는 데이터를 명확히 가져오기위해선 pk사용을 추천한다고 했으며 팀프로젝트시 이를 통일해주는게 좋다고 한다.
id와 pk중 id로의 호출이 속도가 더 빠르며 id는 객체 생성시 자동으로 장고에서 생성시켜주는 고유번호이다.

의도적으로 사용자가 table에 고유번호를 입력하고 싶을시 필드에 `primary key=true`로 설정이 가능하고 이는 `null=False`, `unique=Treu`가 설정됩니다.

#### 외래키로 연결된 값 생성 하기

장고 model에서 foreignkey를 사용하여 테이블을 연결하게되면 연결된 Question객체에는 choice_set이라는 메소드가 생성되는데 이를 통해 연결된 데이터를 생성할 수 있습니다.

```python
# Question에있는 첫번째 인스턴스 가져오기
q = Queation.objects.get(pk=id)

# choice는 외래키로 Question과 연결되어있어 choice_set이라는 method를 가져온다.
# choice_set() 이라는 메소드는 Choice객체를 반환하며 내부에 여러기능이 있는데 이는 따로 정리하겠습니다.
q.choice_set.create(choice_text='Not much', votes=0)
```

### filter

### Foreinkey

### ManyToMany

### OneToOne

### Django Template

## View

```python
from django.http import HttpResponse
from django.template import loader

from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    template = loader.get_template('polls/index.html')
    context = {
        'latest_question_list': latest_question_list,
    }
    return HttpResponse(template.render(context, request))
```
위 아래 두 코드는 같은 의미를 가지며 내부적으로 커스텀이 필요할지도? 모를것같아 기록해 둡니다.
```python
from django.shortcuts import render

from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context = {'latest_question_list': latest_question_list}
    return render(request, 'polls/index.html', context)
```

파일구조를

- app
  - templates
    - app
      - index.html

이와 같이 하라는 공식문서의 추천이 있는데 이는 장고에서 템플릿 로더가 templates폴더 내에서 html을 찾는 방식 때문이고 우리가 참조할때 app/index.html과 같이 가독성있게 참조하기 위함이다.

출처

- django 공식문서
- [PK .vs ID](https://velog.io/@wltjs10645/Django-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B4%80%EA%B3%84)
