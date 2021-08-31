package com.pplink.pagecall.model

data class ClosedRoom(
    var id: String,
    var name: String,
    var pcaRoomId: String,
    var start: String,
    var end: String,
    var participant: Int,
    var createdAt: String,
    var updatedAt: String
)