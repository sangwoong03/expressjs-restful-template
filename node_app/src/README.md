## Typeorm

`ORM` 서비스 중 Typescript와의 호환 측면에서도 유리합니다.

다양한 ORM 기능에만 의존하지 않고 SQL Raw Query 문을 실행할 수 있습니다.

<br>

### 📌 Typeorm 설치

설치하는 방법은 다음과 같습니다:
```
npm install typeorm
```

설치 과정 중 다음 에러가 발생할 수 있습니다.
```
DriverPackageNotInstalledError: Mysql package has not been found installed. ......
```

해당 에러는 `mysql driver`가 설치되어 있지 않을 가능성이 높습니다.

아래 명령어를 통해 설치 후 재실행하면 해결할 수 있습니다.
```
npm isntall mysql
```

<br>

### 📌 Typeorm 환경변수 설정

데이터베이스와 연동하기 위해 여러가지 환경변수가 필요합니다.

```env
DB_CONNECTION = 실제로 연동하려는 데이터베이스 클라이언트 이름 // mysql
DB_HOST = 데이터베이스 연결 호스트 // 127.0.0.1
DB_USERNAME = 데이터베이스 ID // root
DB_PASSWORD = 데이터베이스 PW // myPssword
DB_DATABASE = 데이터베이스 이름 // myDB
DB_PORT = 데이터베이스 연결 포트 번호 // 3306
DB_LOGGING =데이터베이스 연결 시 로그 사용 여부 // TRUE
```

다음과 같이 활용할 수 있습니다.

```javascript
const { DataSource } = require("typeorm")
const dotenv = require("dotenv")
dotenv.config()

const myDataSource = new DataSource({
    type    : process.env.DB_CONNECTION,
    host    : process.env.DB_HOST,
    port    : process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    ...
```