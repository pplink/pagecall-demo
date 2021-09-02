package com.pplink.pagecall.model

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.pplink.pagecall.network.PagecallApi
import kotlinx.coroutines.launch

class RoomViewModel : ViewModel() {
    private var _liveRooms = MutableLiveData<List<LiveRoom>>()
    val liveRooms: LiveData<List<LiveRoom>> = _liveRooms

    private var _closedRooms = MutableLiveData<List<ClosedRoom>>()
    val closedRooms: LiveData<List<ClosedRoom>> = _closedRooms

    init {
        getRooms()
    }

    private fun getRooms() {
        viewModelScope.launch {
            val getRoomsResponse = PagecallApi.retrofitService.getRooms()
            _liveRooms.value = getRoomsResponse.liveRooms
            _closedRooms.value = getRoomsResponse.closedRooms
        }
    }

    fun createLiveRoom(name: String) {
        viewModelScope.launch {
            val createRoomRequest = CreateRoomRequest(name)
            val createRoomResponse = PagecallApi.retrofitService.createRoom(createRoomRequest)
            val mutableList = _liveRooms.value!!.toMutableList()
            mutableList.add(createRoomResponse.room)
            _liveRooms.value = mutableList
        }
    }

    fun closeLiveRoom(id: String) {
        viewModelScope.launch {
            val closeRoomsResponse = PagecallApi.retrofitService.closeRoom(id)

            _liveRooms.value = _liveRooms.value!!.filter { it.id != id }

            val closedRoomList = _closedRooms.value!!.toMutableList()
            closedRoomList.add(closeRoomsResponse.room)
            _closedRooms.value = closedRoomList
        }
    }
}