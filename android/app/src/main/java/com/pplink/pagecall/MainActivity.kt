package com.pplink.pagecall

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.activity.viewModels
import com.pplink.pagecall.adapter.ClosedRoomAdapter
import com.pplink.pagecall.adapter.LiveRoomAdapter
import com.pplink.pagecall.databinding.ActivityMainBinding
import com.pplink.pagecall.model.RoomViewModel

class MainActivity : AppCompatActivity() {
    private val viewModel: RoomViewModel by viewModels()
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        changeRoomListView(true)

        binding.isLive.setOnCheckedChangeListener { _, isLive ->
            changeRoomListView(isLive)
        }
    }

    private fun changeRoomListView(isLive: Boolean) {
        if (isLive) {
            binding.liveRoomList.adapter = LiveRoomAdapter(this, viewModel.liveRooms)
            binding.liveRoomList.visibility = View.VISIBLE
            binding.closedRoomList.visibility = View.GONE
        } else {
            binding.closedRoomList.adapter = ClosedRoomAdapter(this, viewModel.closedRooms)
            binding.liveRoomList.visibility = View.GONE
            binding.closedRoomList.visibility = View.VISIBLE
        }
    }
}