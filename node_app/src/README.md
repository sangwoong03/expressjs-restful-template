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

<br>
<br>

## 📌 JWT 

JWT는 `Json Web Token`의 약자로, 클라이언트와 서버 간에 정보를 JSON 객체로 안전하게 전송하기 위한 개방형 표준 (RFC 7519)입니다.

JWT를 이용한 인증 과정은 사용자 측에 사용자의 정보를 관리하는 토큰 기반의 인증 메커니즘입니다.

따라서 세션 정보를 저장하기 위한 세션 스토리지나 별도의 데이터베이스를 사용하지 않아도 되며,  
서버의 확장성과 멀티 기기 및 도메인 등 다양한 활용 이점을 가지고 있습니다.

다만, 데이터를 숨기는 것이 목적이 아니라, 데이터의 신뢰성을 보장 (전자 서명)하는 것이기 떄문에  
서명된 JWT와 HTTPS를 사용하는 것을 권장하고 있습니다.

### JWT 설치

```
npm install jsonwebtoken --save
```

<br>

### JWT 발급하기 예제

```javascript
const jwt = require("jsonwebtoken"); // jwt 모듈 import

const payload = { userId = user.userId } // payload에 담을 내용
const secretKey = "Secret-key is recommended controlling in .env file" // secret key

const jwnToken = jwt.sign(payload, secretkey) // jwt 발행
```
<br>

### JWT 확인하기 예제

```javascript

// secretKey 일치 여부 검증을 통해 유저 인가 절차 진행
const decoded = jwt.verify(jwtToken, secretKey); 
```
<br>
<br>

## 📌 Bcrypt

Bcrypt는 브루스 슈나이어가 설계한 키(key) 방식의 `대칭형` 블록 암호에 기반을 둔 `암호화 해시 함수`입니다.

레인보우 테이블 공격을 방지하기 위해 솔팅과 키 스트레칭을 적용한 대표적인 모듈 중 하나입니다.

### bcrypt 설치

```
npm install bcrypt --save
```

<br>

### 암호화 예제

```javascript
const bcrypt = require("bcrypt") // bcrypt 모듈 import

const password = req.body.password // 요청 body의 password 값 
const saltRounds = 12; // 

// hash 비밀번호 만들기 hash(arg1, arg2) 메서드 활용
const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRoudns)
}

// main함수
const exampleBcrypt = async () => {
    const hashedPw = await makeHash(password, saltRounds);
}
```

<br>

### 암호화 비밀번호 검증 예제

```javascript

// compare() 메서드를 활용하여 요청 비밀번호 vs. 저장된 hashedPw 비교
const checkHash = async (password, hashedPw) => {
    return await bcrypt.compare(password, hashedPassword)
}

const exmapleBcrypt = async () => {
    const hashedPw = await makeHash(password, saltRounds);
    const result = await checkHash(password, hashedPw)
}
```