# sulmogram - 1

## stack

- node express
- prisma_1 : js 또는 ts 서버와 DB사이에서 조작을 돕는 툴?(ORM)
  - prisma 1.34 버전으로 docker와 함께 사용
- react

## dependencies

- nodemon : 파일 저장시 명령어 자동실행(서버를 리부트할필요 없음)
- babel/[something] : 노드에 맞는 최신 js문법컴파일러 관련
- dotenv : DB와 연결하기위해 사용됨
  - dotenv는 `current work directory`에서 `.env`파일을 찾아
- graphql-yoga : graphql 서버 실행테스트
- morgan : 로깅 전용모듈(요청속도와 방식을 콘솔에 계속 찍어줌)
- merge-graphql-schemas : graphql에서의 스키마들을 한파일로 묶을때 사용 (fileLoader, mergeResolvers, mergeTypes)와 같이 파일 경로로 resolvers와 typeDefs를 불러와 한 파일로 합병한다.
- graphql-tools : makeExecutableSchema로 위에서 병합한 파일을 graphql서버에 넣을 인자값 `{typeDefs, resolvers}`와 같은 객체로 만든다.
- nodemailer : 이메일을 보내기위한 라이브러리
- nodemailer-sendgrid-transport
- passport
- passport-jwt : 3.5부터 jwt에대한 니코의 사용법을 볼수있다.

## docker  

이번 클론코딩을 하며 처음 사용해보았으며 무지함으로 인한 4일의 시간이 흘렀다.

일단 prisma1을 사용하기위해 도커를 통해 db를 실행하고 이를 prisma와 연결하여 사용해야 해서 최대한 간단히 기본만 구축하였다.

docker란?

도커는 virtual machine보다 가볍고 빠르게 모든 개발환경을 담고 제어할 수 있다. GuestOS를 따로 설치하지않아 system call을 공유하여 빠르고 docker 엔진에서 이미지와 컨테이너로 라이브러리, 시스템 도구, 코드, 런타임 등 소프트웨어를 실행하는데 모든것을 담을 수 있어 문제없이 실행 가능하다.

기본적으로 Linux의 컨테이너 시스템을 응용한 서비스로 window와 macOS를 사용하게되면 각각의 OS만의 가상화기술이 필요한데 윈도우는 HyperV를 이용한다. 이는 window의 최신 버전에서 지원하며 이전 버전들은 따로 사용하기 까다롭거나 불가능하다.

- window에서 docker를 사용시 주의사항  
  - home 버전과 나머지 버전은 사용 방법이다름으로 os업뎃을 꼭 하고 시작할 것
  - 본인은 home버전이였고 home버전은 wsl2에 docker를 설치하여 사용해야 함
  - wsl2를 사용하기위해서 microsoft store에서 windows terminal과 ubuntu 배포판을 설치하고 시작해야 함
