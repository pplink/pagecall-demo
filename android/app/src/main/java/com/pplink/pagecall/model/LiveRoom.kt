package com.pplink.pagecall.model

data class LiveRoom(
    var id: String,
    var name: String,
    var pcaRoomId: String,
    var start: String,
    var end: String? = null,
    var participant: Int,
    var createdAt: String,
    var updatedAt: String
)