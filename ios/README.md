# PageCall 데모 애플리케이션 iOS 클라이언트

PageCall 데모 애플리케이션을 위한 iOS 클라언트 입니다. 본 예제는 고객사의 PageCall iOS Mobile SDK 도입에 대한 이해를 돕고자 만들어졌습니다.

## 안내

- 본 예제는 Swift를 사용하여 구현되어 있습니다.
- iPad를 기준으로 만들어졌습니다.
- [Node.js 서버 데모](../server) 서버와 REST API로 통신합니다.

## 기능 목록

- 강의실 목록
- 강의실 생성
- 강의실 입장
- 강의실 종료

## 사전 요구사항

- [Node.js 서버 데모](../server) 안내에 따라 서버를 먼저 실행 시키고 진행을 해야 합니다.
- Xcode ≥ 11.1
- iOS ≥ 11
- Swift ≥ 4.2
- 테스트 기기 종류: iPhone, iPad
- 시뮬레이터 지원 가능
  
## 사용법

1. Xcode를 실행합니다.
2. ios/PageCall 폴더를 오픈합니다.
3. API 서버 엔드포인트를 설정합니다.
   1. 로컬에서 서버를 실행 중 (시뮬레이터만 지원)
      - PageCall/PageCall/Service.swift 파일에서 서버 주소를 ```http://127.0.0.1:8080``` 으로 변경해 줍니다.
   2. 원격 서버에서 서버를 실행 중 (디바이스, 시뮬레이터 모두 지원)
      - PageCall/PageCall/Service.swift 파일에서 서버 주소를 원격 서버 주소로 변경해 줍니다.
4. 앱을 실행해 볼 iPad 시뮬레이터 또는 테스트 기기를 지정합니다.
5. 앱이 정상적으로 실행이 되는지 확인합니다.

## Pagecall iOS SDK 설치
### CocoaPods
`PodFile`: 에 아래 항목을 추가합니다.
```
target 'PageCall' do
  use_frameworks!

  pod 'PageCallSDK', '~> 2.1.1', :source => 'https://github.com/pplink/pagecall-specs.git'
  pod 'GoogleWebRTC', '1.1.29229' :source => 'https://github.com/cocoapods/specs'
end
```
`run pod install --verbose`을 실행 하여 프로젝트에 추가 합니다.

## 구조

- ex) src/app: Express.js 의 라우터와 컨트롤러가 구현되어 있습니다.
