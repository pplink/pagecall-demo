# Pagecall 데모 애플리케이션 API 서버

Pagecall 데모 애플리케이션을 위한 API 서버 입니다. 본 예제는 고객사의 Pagecall 서버 연동에 대한 이해를 돕고자 만들어졌습니다.

## 안내

- 본 예제는 Typescript와 Express.js를 사용하여 구현되어 있습니다.
- 고객사의 간편한 실행 테스트를 위해 실제 DB를 연동하지 않고 ([src/models/room.ts](./src/models/room.ts)) 안에 Mock DB용 배열을 만들어서 사용하고 있습니다.
- 따라서 서버를 재 실행할 시, 데이터가 초기화 됩니다.
- 이해를 돕기 위해 .env를 사용하고 있습니다. 실제 프로덕션에는 보안을 위해 .env의 사용을 지양해 주시길 바랍니다.
- Pagecall 서버와 REST API로 통신합니다.

## 기능 목록 ([API 문서](API.md))

- 강의실 목록
- 강의실 생성
- 강의실 입장
- 강의실 종료

## 사전 요구사항

- Pagecall 개발자 콘솔 에서 API 키 발급 및 Layout ID 복사 ([Pagecall 개발자 콘솔 링크](https://console.pagecall.net/))
- Layout ID는 ```classic-mobile``` 레이아웃의 ID를 사용해주세요.
- Node.js ([설치 링크](https://nodejs.org/ko/download/))
  
## 사용법
***.env 파일에 사용하실 Pagecall API key와 Pagecall Layaout ID를 넣어주세요***
- 의존성 설치: ```npm install``` 또는 ```yarn```
- 로컬 실행: ```npm start``` 또는 ```yarn start```
- 배포판 실행: ```npm run start:prod``` 또는 ```yarn start:prod```
- 배포판 종료: ```npm stop``` 또는 ```yarn stop```

## 구조

- src/app: Express.js 의 라우터와 컨트롤러가 구현되어 있습니다.
- src/env: 서버 실행 시, 환경변수를 불러와 변수로 저장합니다.
- src/helpers: 서버에서 사용하는 함수들이 구현되어 있습니다.
- src/helpers/pagecall.ts: Pagecall 서버와의 REST API 통신이 구현되어 있습니다.
- src/models: 데이터 모델들이 구현되어 있습니다.
- src/types: 서버에서 사용하는 타입들이 선언되어 있습니다.