package com.pplink.pagecall.model

data class GetRoomsResponse(
    val liveRooms: List<LiveRoom>,
    val closedRooms: List<ClosedRoom>
)

class CreateRoomRequest(
    val name: String
)

data class CreateRoomResponse(
    val room: LiveRoom
)

data class EnterRoomRequest(
    val nickname: String
)

data class EnterRoomResponse(
    val url: String
)

data class CloseRoomResponse(
    val room: ClosedRoom
)
