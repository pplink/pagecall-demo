# Pagecall 데모 애플리케이션 안드로이드 클라이언트

Pagecall 데모 애플리케이션을 위한 안드로이드 클라이언트 입니다. 본 예제는 고객사의 Pagecall 안드로이드 Mobile SDK 도입에 대한 이해를 돕고자 만들어졌습니다.

## 안내

- 본 예제는 Kotlin을 사용하여 구현되어 있습니다.
- Galaxy Tab S4를 (2560 x 1600) 기준으로 만들어졌습니다.
- [Node.js 서버 데모](../server) 서버와 REST API로 통신합니다.

## 기능 목록

- 강의실 목록
- 강의실 생성
- 강의실 입장
- 강의실 종료

## 사전 요구사항

- [Node.js 서버 데모](../server) 안내에 따라 서버를 먼저 실행 시키고 진행을 해야 합니다.

## 프로젝트 버전 정보

- Android ≥ 9.0 (API Level 28)
- Gradle ≥ 7.0.1
- Kotlin ≥ 1.5.21
- Java >= 8
  
## 사용법

1. Android Studio를 실행합니다.
2. android 폴더를 오픈합니다.
3. API 서버 엔드포인트를 설정합니다. network/api.kt 파일에서 BASE_URL을 변경합니다.
   1. 로컬에서 서버를 실행 중 (에뮬레이터만 지원)
      - 서버 주소를 ```http://10.0.2.2:8080``` 으로 변경해 줍니다.
   2. 원격 서버에서 서버를 실행 중 (디바이스, 에뮬레이터 모두 지원)
      - 서버 주소를 원격 서버 주소로 변경해 줍니다.
4. 앱을 실행해 볼 안드로이드 에뮬레이터 또는 테스트 기기를 지정합니다.
5. 앱이 정상적으로 실행이 되는지 확인합니다.

## 핵심 소스코드
***페이지콜을 WebView에 보여주는 핵심 로직이 동작합니다.***
- dialog/EnterRoomDialog.kt : API로 부터 Pagecall 입장 URL을 받아와서 WebViewActivity로 전달하고 이동합니다.
- WebViewActivity.kt: Pagecall SDK를 사용하여 Pagecall을 실행합니다.
- manifests/AndroidManifest.xml: Pagecall이 필요한 권한들이 있습니다.