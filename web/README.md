# Pagecall 데모 애플리케이션 웹 클라이언트

Pagecall 데모 애플리케이션을 위한 웹 클라이언트 입니다. 본 예제는 고객사의 Pagecall 웹 도입에 대한 이해를 돕고자 만들어졌습니다.

## 안내

- 본 예제는 React.js를 사용하여 구현되어 있습니다.
- 크롬 기준으로 개발이 되었습니다.
- [Node.js 서버 데모](../server) 서버와 REST API로 통신합니다.
- IFrame 내에서 페이지콜을 구동합니다. Pagecall은 웹의 경우 IFrame을 사용하는 것을 권장합니다.

## 기능 목록

- 강의실 목록
- 강의실 생성
- 강의실 입장
- 강의실 종료

## 사전 요구사항

- [Node.js 서버 데모](../server) 안내에 따라 서버를 먼저 실행 시키고 진행을 해야 합니다.
  
## 사용법
***.env 파일에 서버의 주소를 넣어주세요***
- 의존성 설치: ```npm install``` 또는 ```yarn```
- 로컬 실행: ```npm start``` 또는 ```yarn start```

## 구조

- src/pages: 강의실 목록 페이지, Pagecall 강의실 용 IFrame 페이지 등이 구현되어 있습니다.
- src/models: 강의실 데이터들에 대한 타입이 선언되어 있습니다.
- src/helpers: 서비스 전역에서 사용하는 여러 함수들이 구현되어 있습니다.
- src/env: 환경변수를 불러옵니다.
- src/context: 강의실 목록의 상태가 Context API로 구현되어 있습니다.
- src/components: 데모 서비스를 위한 뷰 컴포넌트들이 구현되어 있습니다.