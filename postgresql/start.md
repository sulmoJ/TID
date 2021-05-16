## postgresql 설치 및 세팅

### 설치

`brew install postgresql`

### 실행

`pg_ctl -D /usr/local/var/postgres start && brew servies start postgresql`

### 일단 아무 db 접속

`psql postgres`

### 사용자 목록보기

`\du`

sulmo라는 기본 계정이 생성되어있었고 모든 권한이 부여된 상태였음

### db list

`\l`

### 비밀번호 설정

sulmo라는 사용자의 비밀번호 설정하기

`\password sulmo`

### 터미널에서 postgresql접속시

`psql django_test -U sulmo`
sulmo유저로 django_test DB에 접속

### db생성

`CREATE DATABASE django_test;`

### 유저생성

`CREATE USER django_tester PASSWORD '1234';`

비밀번호가 1234 인 django_tester 유저 생성

### 권한 부여

`ALTER ROLE django_tester CREATEDB;`

CREATEDB권한 django_tester에게 부여

`ALTER ROLE django_tester SUPERUSER;`

## 장고랑 연동할때

연결할 디비에 유저하나 생성 후 아래와같이 권한 부여

alter role root set client_encoding to 'utf-8';

alter role root set timezone to 'Asia/Seoul';

grant all privileges on database django_test to root;
