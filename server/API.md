# 강의실 목록
## 요청
```
GET /rooms
```
## 응답
```
{
    "liveRooms": [
        {
            "id": "nQJc4TAsiBurF7OZ",
            "name": "PageCall 강의실",
            "pcaRoomId": "60ff8beebdfcaa000830c6a4",
            "start": "2021-07-27T04:30:37.830Z",
            "end": null,
            "participant": 0,
            "createdAt": "2021-07-27T04:30:38.041Z",
            "updatedAt": "2021-07-27T04:30:38.041Z"
        },
        {
            "id": "t7JyhL8yxJiikpfr",
            "name": "Hello, World!",
            "pcaRoomId": "60ff8bde9959f800080bbfc2",
            "start": "2021-07-27T04:30:22.147Z",
            "end": null,
            "participant": 0,
            "createdAt": "2021-07-27T04:30:22.454Z",
            "updatedAt": "2021-07-27T04:30:22.454Z"
        }
    ],
    "closedRooms": [
        {
            "id": "tShE2gbIjfypuRIR",
            "name": "PageCall 강의실 두번째",
            "pcaRoomId": "60ff8c4bbdfcaa000830c6c4",
            "start": "2021-07-27T04:32:11.142Z",
            "end": "2021-07-27T04:36:29.068Z",
            "participant": 1,
            "createdAt": "2021-07-27T04:32:11.313Z",
            "updatedAt": "2021-07-27T04:36:29.068Z"
        }
    ]
}
```

# 강의실 생성
## 요청
```
POST /rooms

{
    "name": "PageCall 강의실 생성"
}
```
## 응답
```
{
    "room": {
        "id": "tShE2gbIjfypuRIR",
        "name": "PageCall 강의실 생성",
        "pcaRoomId": "60ff8c4bbdfcaa000830c6c4",
        "start": "2021-07-27T04:32:11.142Z",
        "end": null,
        "participant": 0,
        "createdAt": "2021-07-27T04:32:11.313Z",
        "updatedAt": "2021-07-27T04:32:11.313Z"
    }
}
```

# 강의실 입장
## 요청
```
POST /rooms/:roomId

{
    "nickname": "유저 닉네임"
}
```
## 응답
```
{
    "url": "https://app.pagecall.net/60ff8c4bbdfcaa000830c6c4?access_token=vJVU8AxslABrlcWKv9ppGVwYPqXNwOFx"
}
```

# 강의실 종료
## 요청
```
PUT /rooms/:roomId
```
## 응답
```
{
    "room": {
        "id": "tShE2gbIjfypuRIR",
        "name": "PageCall 강의실 생성",
        "pcaRoomId": "60ff8c4bbdfcaa000830c6c4",
        "start": "2021-07-27T04:32:11.142Z",
        "end": "2021-07-27T04:36:29.068Z",
        "participant": 1,
        "createdAt": "2021-07-27T04:32:11.313Z",
        "updatedAt": "2021-07-27T04:36:29.068Z"
    }
}
```