package com.pplink.pagecall.model

data class RoomList (
    val liveRooms: List<LiveRoom>,
    val closedRooms: List<ClosedRoom>
)