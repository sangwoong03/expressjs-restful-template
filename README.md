## node.js express Stuyding

Tutorial for `Node.Js` from database `MySQL` to `express` for REST API

<br>

### 📌 Index
- Database: MySQL
- Language: NodeJs
- Library: express, nodemon 
- typeorm
- REST API

  <br>  
  <br>

### 📌 Library & Third-party Module

1. MySQL
2. express
3. nodemon
...

   <br>
   <br>

### 📌 Server 서버란?

- 요청을 하면 요청한 내용을 보내주는 프로그램을 가리킵니다.
- 쉽게 말해 식당에서 서빙하는 역할을 하는 것입니다.
- 비유 ) 클라이언트 = 식당 손님 / 서버 = 식당 알바생
- HTTP 요청 방식 4가지
  1.  읽기 `GET`
  2.  쓰기 `POST`
  3.  수정 `PUT`
  4.  삭제 `DELETE`

      <br>
      <br>

### 📌 REST API:

- 웹 개발 시 API (Application Programming Interface)

  - 웹 서버와 클라이언트의 소통 방법
  - 예시) get`("url", ...))`

- REST API (Representational State Transfer API, Roy Fielding):

  **[REST 원칙 6개]**

  1.  Uniform Interface (중요)
      - 하나의 자료는 하나의 url.
      - 예측 가능성
      - 요청과 응답은 정보가 충분히 들어가있어야 함.
  2.  Client - Server 역할 구분
      - 브라우저는 요청만
      - 서버는 응답만
  3.  Stateless
      - 요청1, 요청2 즉 각각의 요청들은 의존성이 없어야 함.
  4.  Cacheable
      - 서버에서 보내주는 정보들은 캐싱이 가능해야 함.
      - 캐싱을 위한 버전 관리도 잘해야 함. (브라우저 역)
  5.  Layered System
      - 컴포넌트의 그룹화 및 계층 구조화
  6.  Code on Demand - 클라이언트의 요청에 따른 소통이 필요  
      <br>
      <br>
      **[이름짓기 원칙]**

  - url을 명사로 작성
  - 하위 문서를 명시할 땐 /파일확장자(.html) 쓰지 않기
  - 띄어쓰기는 대시(-) 이용
  - 자료 하나 당 하나의 url
    <br>
    <br>

## Database

### 📌 MongoDB:

- 관계형 데이터베이스 사용 (MySQL, Oracle ...)
  - 행과 열로 저장됨.
  - SQL이라는 언어를 사용해야함. (엑셀 함수)
- **MongoDB** 는 SQL언어를 사용하지 않고, 파일 내에 정보가 객체 형태로 저장됨.

  - DB를 실제 컴퓨터에 설치하기도 하지만 배포 시 보안 유지를 위해 클라우드 서비스를 이용하는 것이 안전.
  - 접속 속도가 빠르며, 백업과 트래픽 관리에 신경을 덜 써도 됨.  
    <br>

- **MongoDB Settings** (무료 호스팅)

  1.  [MobgoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try2?https://www.mongodb.com/cloud/atlas/lp/try2-aterms&utm_source=google&utm_campaign=gs_apac_south_korea_search_core_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624365&adgroup=115749706543&gclid=CjwKCAjw3cSSBhBGEiwAVII0Z_VbB0FGyTHppv24KCVIr-Kn7ARePSG0yPsoPpFvJrOaZAznxERkahoCoKsQAvD_BwE) 접속
  2.  구글 아이디 로그인
  3.  무료티어 및 클라우드 (aws - seoul) 선택
  4.  Database Access - accout/pw
  5.  Network Access - IP (access from anywhere)
  6.  Database - Browse Collections - Add my Own Data - database name (woong_app), collection name (post)
  7.  설치 및 연동

      ```
         npm install mongodb
      ```

      ```javascript
      const MongoClient = require("Mongodb").MongoClient;

      MongoClient.connect(
      	"mongodb+srv://DB계정아이디:DB계정패스워드@cluster0-qaxa3.mongodb.net/데이터베이스이름?retryWrites=true&w=majority",
      	(err, client) => {
      		// 데이터베이스 접속 후 실행할 코드 작성
      	},
      );
      ```

<br>

### 📌 MySQL