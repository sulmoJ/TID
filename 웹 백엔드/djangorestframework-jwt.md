### djangorestframework-jwt

jwt를 python 프레임워크인 django에서 사용하기위해 돕는 라이브러리입니다.

파이썬에서 JWT를 다루기위한 라이브러리인 PyJWT를 사용하며 사용가능한 부분에 있어서 옵션을 수정할 수 있습니다.

[djangorestframework-jwt](https://jpadilla.github.io/django-rest-framework-jwt/#additional-settings)의 공식문서에 있는 세팅예제입니다.

```python
JWT_AUTH = {
  "JWT_ENCODE_HANDLER": "rest_framework_jwt.utils.jwt_encode_handler",

  "JWT_DECODE_HANDLER": "rest_framework_jwt.utils.jwt_decode_handler",

  "JWT_PAYLOAD_HANDLER": "rest_framework_jwt.utils.jwt_payload_handler",

  "JWT_PAYLOAD_GET_USER_ID_HANDLER": "rest_framework_jwt.utils.jwt_get_user_id_from_payload_handler",

  "JWT_RESPONSE_PAYLOAD_HANDLER": "rest_framework_jwt.utils.jwt_response_payload_handler",

  "JWT_SECRET_KEY": settings.SECRET_KEY,
  "JWT_GET_USER_SECRET_KEY": None,
  "JWT_PUBLIC_KEY": None,
  "JWT_PRIVATE_KEY": None,
  "JWT_ALGORITHM": "HS256",
  "JWT_VERIFY": True,
  "JWT_VERIFY_EXPIRATION": True,
  "JWT_LEEWAY": 0,
  "JWT_EXPIRATION_DELTA": datetime.timedelta((seconds = 300)),
  "JWT_AUDIENCE": None,
  "JWT_ISSUER": None,

  "JWT_ALLOW_REFRESH": False,
  "JWT_REFRESH_EXPIRATION_DELTA": datetime.timedelta((days = 7)),

  "JWT_AUTH_HEADER_PREFIX": "JWT",
  "JWT_AUTH_COOKIE": None
}
```

jwt 설정 사항들을 확인해보던 중 두가지 설정의 차이가 궁굼해져 확인해 보았습니다.

- JWT_REFRESH_EXPIRATION_DELTA: 토큰 리프레시 주기 설정 (Access Token)
- JWT_EXPIRATION_DELTA : 토큰 만료 시간 값 (Refresh Token)

토큰 탈취에대한 보안적인 부분으로 기존 jwt의 방식에서 **강화된 버전**이 있더군요. 기본적인 jwt 방식은 토큰을 탈취 당하면 유효한 기간동안 정보가 다 털릴 수 있습니다. 그래서 새로 고안해낸 방법이 refresh token을 추가로 사용하게 되는 방식입니다.

Access token(이하 at)과 refresh token(이하 rt)을 사용한 방식의 메커니즘은 다음과 같습니다.

    1. 첫 로그인시 at와 rt를 모두 발급 받습니다.
    2. 클라이언트는 at와 rt를 모두 가지고 at를 사용합니다.
    3. at를 사용하던 도중 만료가 된 토큰이면 rt를 통해 at를 새로 발급 받습니다.
    4. rt의 기간 마저 만료되면 로그인을 새로 시도해야합니다.

- rt와 at는 같은 구조의 jwt이다.
- 로그인을 자주하지 않으면서 토큰의 만료기간을 줄이기 위한 방법이다.
- 장점
  - 보안이 더 강화된다
- 단점
  - 기존 at만 있을때보다 구현이 복잡해진다
  - 추가적인 요청이 더 많이 발생한다. 만료가 되었을때를 백엔드에서 판단해야하기 때문에 at가 만료되면 다시 rt를 통한 at 생성절차를 거쳐야 하기때문이다.
  - 프론트에서 만료 여부라도 판단하여 한번이라도 요청을 줄이는 방식을 사용하면 좋을듯 하다.(가능한지는 모르겠음..)

[참고한 블로그](https://tansfil.tistory.com/59)
