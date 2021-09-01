package com.pplink.pagecall.model

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class RoomViewModel : ViewModel() {
    private val _liveRooms = MutableLiveData<List<LiveRoom>>()
    val liveRooms: LiveData<List<LiveRoom>> = _liveRooms
    private val _closedRooms = MutableLiveData<List<ClosedRoom>>()
    val closedRooms: LiveData<List<ClosedRoom>> = _closedRooms

    init {
        getRooms()
    }

    private fun getRooms() {
        _liveRooms.value = Mock().loadLiveRooms()
        _closedRooms.value = Mock().loadClosedRooms()
    }


}