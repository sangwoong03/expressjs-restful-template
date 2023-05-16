# (작성중) API

## Project Structure

```bash
.
├── api
│   ├── routes
│   ├── controllers
│   ├── services
│   ├── models
│   └── bootstrap.js
├── migrations
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── Dockerfile
├── scripts
└── swagger
```

- api: 실질적인 API 기능 코드는 전부 이 api 모듈에 포함되어 있다. api 모듈은 layered pattern을 기반으로 디렉토리 구성이 되어 있으며 다음 3개의 sub module을 포함한다:
  - routes:
  - controllers:
  - services: Business 로직을 담당하는 모듈.
  - models: Database와 data 관련 로직을 담당하는 모듈.

---

## Install

```bash
$ npm install
```

## Configure App

`.env.sample` 구조를 참고하여 `.env`를 루트 디렉토리에 생성.

- Google OAuth2 Client Credentials
- Token용 SECRET
- TypeORM Connection Details

## Running the project

```bash
$ npm run watch
```
