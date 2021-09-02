package com.pplink.pagecall.model

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class RoomViewModel : ViewModel() {
    private var _liveRooms = MutableLiveData<List<LiveRoom>>()
    val liveRooms: LiveData<List<LiveRoom>> = _liveRooms

    private var _closedRooms = MutableLiveData<List<ClosedRoom>>()
    val closedRooms: LiveData<List<ClosedRoom>> = _closedRooms

    init {
        getRooms()
    }

    private fun getRooms() {
        _liveRooms.value = Mock().loadLiveRooms()
        _closedRooms.value = Mock().loadClosedRooms()
    }

    fun findLiveRoomById(id: String): LiveRoom? {
        return _liveRooms.value!!.find { liveRoom -> liveRoom.id == id }
    }

    fun addLiveRoom(room: LiveRoom) {
        val mutableList = _liveRooms.value!!.toMutableList()
        mutableList.add(room)
        _liveRooms.value = mutableList
    }

    fun removeLiveRoom(room: LiveRoom) {
        val mutableList = _liveRooms.value!!.toMutableList()
        mutableList.remove(room)
        _liveRooms.value = mutableList
    }

    fun addClosedRoom(room: ClosedRoom) {
        val mutableList = _closedRooms.value!!.toMutableList()
        mutableList.add(room)
        _closedRooms.value = mutableList
    }
}