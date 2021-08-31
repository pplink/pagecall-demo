package com.pplink.pagecall.model

class Mock {
    fun loadLiveRooms(): List<LiveRoom> {
        return listOf<LiveRoom>(
            LiveRoom(
                "1",
                "a",
                "pcaRoomId",
                "2021-08-31T01:01:01.000Z",
                null,
                5,
                "2021-08-31T01:01:01.000Z",
                "2021-08-31T01:01:01.000Z"
            ),
            LiveRoom(
                "2",
                "b",
                "pcaRoomId",
                "2021-08-31T01:01:01.000Z",
                null,
                5,
                "2021-08-31T01:01:01.000Z",
                "2021-08-31T01:01:01.000Z"
            ),
            LiveRoom(
                "3",
                "c",
                "pcaRoomId",
                "2021-08-31T01:01:01.000Z",
                null,
                5,
                "2021-08-31T01:01:01.000Z",
                "2021-08-31T01:01:01.000Z"
            ),
            LiveRoom(
                "4",
                "d",
                "pcaRoomId",
                "2021-08-31T01:01:01.000Z",
                null,
                5,
                "2021-08-31T01:01:01.000Z",
                "2021-08-31T01:01:01.000Z"
            )
        )
    }

    fun loadClosedRooms(): List<ClosedRoom> {
        return listOf<ClosedRoom>(
            ClosedRoom(
                "5",
                "e",
                "pcaRoomId",
                "2021-08-31T01:01:01.000Z",
                "2021-08-31T01:01:01.000Z",
                5,
                "2021-08-31T01:01:01.000Z",
                "2021-08-31T01:01:01.000Z"
            ),
            ClosedRoom(
                "6",
                "f",
                "pcaRoomId",
                "2021-08-31T01:01:01.000Z",
                "2021-08-31T01:01:01.000Z",
                5,
                "2021-08-31T01:01:01.000Z",
                "2021-08-31T01:01:01.000Z"
            ),
            ClosedRoom(
                "7",
                "g",
                "pcaRoomId",
                "2021-08-31T01:01:01.000Z",
                "2021-08-31T01:01:01.000Z",
                5,
                "2021-08-31T01:01:01.000Z",
                "2021-08-31T01:01:01.000Z"
            ),
            ClosedRoom(
                "8",
                "h",
                "pcaRoomId",
                "2021-08-31T01:01:01.000Z",
                "2021-08-31T01:01:01.000Z",
                5,
                "2021-08-31T01:01:01.000Z",
                "2021-08-31T01:01:01.000Z"
            )
        )
    }
}