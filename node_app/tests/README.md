- 테스트 코드에 대한 전반적인 설명은 다음 [블로그](https://velog.io/@sangwoong/Unit-Test-Software-Testing) 참조

- Node.js 기반의 테스트 코드를 위해 필요한 두가지 모듈 설치

```
npm install --save-dev jest supertest
```

- `app.js`와 `server.js` 파일 분리.

분리하는 이유는 createApp()을 실행하는 파일과 실제 가동하는 서버 파일을 구분하여 테스트 코드를 작성함에 있어서도 API의 라우터와 미들웨어를 실행하기 위함이 목적.

- `.env.test` 테스트 전용 환경변수 설정.

실제 운용되는 서버 뿐만 아니라 데이터베이스에도 영향을 미칠 수 있기 때문에 테스트 전용의 환경변수를 설정할 필요성이 있음.

환경변수의 목록은 실제 운용되는 서버의 데이터베이스 정보와 동일하지만 분리하는 것이 그 목적임.

```
.env.test.example
DATABASE_URL = "mysql://username:password@localhost:portnumber/dbname"

CONNECTION = DB_CLIENT
HOST       = LOCALHOST
USERNAME   = USERNAME
PASSWORD   = PASSWORD
DATABASE   = DB_NAME
DB_PORT    = DB_PORTNUMBER
LOGGING    = BOOLEAN

PORT = SERVER_PORTNUMBER

JWT_SECRET = SECRET_KEY
```

다음으로 package.json 파일 내부에서 test를 위한 환경변수를 사용할 수 있도록 다음과 같은 scripts 명령어를 작성해줌.

``` json
// package.json

...
..
.

 "scripts": {
    "test": "DOTENV_CONFIG_PATH=.env.test jest --setupFiles=dotenv/config"
  },
```