package com.pplink.pagecall

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.RecyclerView
import com.pplink.pagecall.adapter.ClosedRoomAdapter
import com.pplink.pagecall.adapter.LiveRoomAdapter
import com.pplink.pagecall.databinding.ActivityMainBinding
import com.pplink.pagecall.model.Mock

class MainActivity : AppCompatActivity() {
    lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val liveRooms = Mock().loadLiveRooms()
        binding.roomList.adapter = LiveRoomAdapter(this, liveRooms)

        binding.isLive.setOnCheckedChangeListener { _, isChekced ->
            if (isChekced) {
                val liveRooms = Mock().loadLiveRooms()
                binding.roomList.adapter = LiveRoomAdapter(this, liveRooms)
            } else {
                val closedRooms = Mock().loadClosedRooms()
                binding.roomList.adapter = ClosedRoomAdapter(this, closedRooms)
            }
        }
    }
}