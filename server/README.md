# PageCall 데모 어플리케이션 API 서버

PageCall 데모 앱을 위한 API 서버 코드 입니다. 본 예제는 고객사의 PageCall 서버 연동에 대한 이해를 돕고자 만들어졌습니다.

## 안내

- 본 예제는 Typescript와 Express.js를 사용하여 구현되어 있습니다.
- 고객사의 간편한 실행 테스트를 위해 실제 DB를 연동하지 않고 ([src/models/room.ts](./src/models/room.ts)) 안에 Mock DB용 배열을 만들어서 사용하고 있습니다.
- 이해를 돕기 위해 .env를 사용하고 있습니다. 실제 프로덕션에는 보안을 위해 .env를 사용을 지양해 주시길 바랍니다.

## 기능 목록 ([API 문서](API.md))

- 강의실 목록
- 강의실 생성
- 강의실 입장
- 강의실 종료

## 사전 요구사항

- PageCall Console 에서 API 키 발급 ([PageCall 콘솔 링크](https://console.pagecall.net/))
- Node.js ([설치 링크](https://nodejs.org/ko/download/))
  
## 사용법
***.env 파일에 사용하실 PageCall API key와 PageCall Layaout ID를 넣어주세요***
- 의존성 설치: ```npm install``` 또는 ```yarn```
- 로컬 실행: ```npm start``` 또는 ```yarn start```
- 배포판 실행: ```npm run start:prod``` 또는 ```yarn start:prod```
- 배포판 종료: ```npm stop``` 또는 ```yarn stop```
