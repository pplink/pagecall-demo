package com.pplink.pagecall.model

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class RoomViewModel : ViewModel() {
    private var _liveRooms = mutableListOf<LiveRoom>()
    val liveRooms: List<LiveRoom>
        get() = _liveRooms

    private var _closedRooms = mutableListOf<ClosedRoom>()
    val closedRooms: List<ClosedRoom>
        get() = _closedRooms

    init {
        getRooms()
    }

    private fun getRooms() {
        Log.d("VIEW_MODEL","test")
        _liveRooms = Mock().loadLiveRooms().toMutableList()
        _closedRooms = Mock().loadClosedRooms().toMutableList()
    }

    fun findLiveRoomById(id: String): LiveRoom? {
        return _liveRooms.find { liveRoom -> liveRoom.id == id }
    }

    fun addLiveRoom(room: LiveRoom) {
        _liveRooms.add(room)
    }

    fun removeLiveRoom(room: LiveRoom) {
        _liveRooms.remove(room)
    }

    fun addClosedRoom(room: ClosedRoom) {
        _closedRooms.add(room)
    }
}