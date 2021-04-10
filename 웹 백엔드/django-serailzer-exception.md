## 장고 시리얼라이저 예외처리

### 시리얼라이저의 추가적인 기능

처음 시리얼라이저에대한 문서를 봤을때 단순히
`python자료구조` => `json`
`json`=> `python자료구조`
요런 기능만 보였지만 지속적으로 사용하면서 들어오는 데이터에대해 유효성 검사와 추가적인 기능이 있다는걸 알았고 정리중입니다.

- 일반 모델에관한 시리얼라이저
  ```python
  class UserSerializer(serializers.ModelSerializer):
  class Meta:
      model = User
      fields = ['__all__']
  ```
- 추가적인 기능

  ```python
  class UserCreateSerializer(serializers.ModelSerializer):

      class Meta:
        model = User
        fields = ['user_id', 'email']

      def validate_email(self, value):
          if 'tjdah' in value:
            raise ValidationError('성모다..')
          return value

      def create(self, validated_data):
          user = User.objects.create(
              email=validated_data['email'],
              user_id=validated_data['user_id']
          )
          user.set_password(validated_data['password'])
          user.save()

          return user
  ```

### 시리얼라이저에서 유효성검사 예외처리

유저를 생성할때 UserCreateSerializer를 사용하여 모델을 사용했다.

create라는 메소드가 생성을 해주며 작동하기위해서
`serializer객체생성` => `is_valid로 유효성검사` => `통과시 save() 메소드로 저장`
순서이다.

is_valid(**raise_exception=True**)를 사용하면 모델 설계에서 지정한 db생성 예외는 바로 400에러와 함께 띄어줄수 있으며 예시 코드의 예외 발생시 결과는

```json
{
  "user_id": ["user의 아이디은/는 이미 존재합니다."],
  "email": ["user의 이메일은/는 이미 존재합니다."]
}
```

로 반환한다.

처음에 이걸 못보고 예외를 직접 validte\_[model속성] 함수를 통해 생성하고 serializer객체에 error를 통해 이상하게 가져오는 방식을 사용했었는데... 특수한 경우의 validation을 주고 싶다면

`rest_framework.exceptions.ValidationError`를 사용해서 직접 validate 함수에 raise 시키는 방식으로 활용합니다.

```python
 class UserCreateSerializer(serializers.ModelSerializer):

     class Meta:
       model = User
       fields = ['user_id', 'email']

     def validate_email(self, value):
         if 'tjdah' in value:
           raise ValidationError('설모다..')
         return value

     def create(self, validated_data):
        ...
```

```json
{
  "user_id": ["user의 아이디은/는 이미 존재합니다."],
  "email": ["성모다.."]
}
```

만약 이런식으로 바로 400에러와 함께 validate단계에서 바로 Response를 보내기 싫다고 추가적인 작업을 뷰에서 하고 싶다면

is_valid에서 raise_exception 파라미터를 빼고 유효성 검사 이후 false 값이 나올시 serializer.error로 에러들이 전부 담겨진다. 이를 가지고 활용하여 추가적인 작업을 실행하면 될 것 같다.
