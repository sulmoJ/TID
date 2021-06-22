### pagination (APIView, PageNumberPagination)

rest api의 형태로 pagination을 위한 구현

drf에서 pagination 자동생성을 위해선 **제네릭뷰** 또는 **뷰셋**을 사용해야하고, **APIView**를 사용하기 위해서는 따로 호출하여 함수를 직접 작성해야한다.

장고에서 제공하는 Pagination의 종류는 PageNumberPagination,  LimitOffsetPagination, CursorPagination 와 커스텀하는 방식으로 이루어져 있다.

해당 포스트에는 APIView와 사용하려는 개인적인 기록으로 코드 예시를 저장합니다.

- `pagination.py`
```python
from rest_framework.pagination import PageNumberPagination


class MyModelPagination(PageNumberPagination):
    page_size = 12      # 한 페이지에 출력할 아이템 수

```




- `views.py` 

```python
class MyView(APIView):

    def get(self, request):
        query_list = MyModel.objects.all()
        paginator = MyModelPagination()
        result_page = paginator.paginate_queryset(validated_list, request)
        serializer = MyModelSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
```
- Response
```json
HTTP 200 OK
{
    "count": 1023
    "next": "https://api.example.org/accounts/?page=5",
    "previous": "https://api.example.org/accounts/?page=3",
    "results": [
       …
    ]
}
```

[공식문서](https://www.django-rest-framework.org/api-guide/pagination/)

[번역글인듯](https://kimdoky.github.io/django/2018/07/19/drf-Pagination/)