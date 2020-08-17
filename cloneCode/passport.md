# passport

인증을위해 stratege를 이용해 많은 인증방법을 쉽게 만들어주는 미들웨어

이번 클론 코딩에선 jwt를 이용해 토큰을 만들고 사용할 예정

passport의 기본형태

```javascript
// server.js
// 모든 경로를 jwt로 보호중( 앞에 '/api'를 인자로 입력시 해당 경로를 jwt로 보호)
server.express.use(authenticateJwt);

// authenticateJWT.js
// jwt 인증 미들웨어
export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (errer, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

```

``` javascript
const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (errer, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
```