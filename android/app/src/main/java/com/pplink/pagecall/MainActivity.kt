package com.pplink.pagecall

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.activity.viewModels
import androidx.core.widget.doAfterTextChanged
import com.pplink.pagecall.adapter.ClosedRoomListAdapter
import com.pplink.pagecall.adapter.LiveRoomListAdapter
import com.pplink.pagecall.databinding.ActivityMainBinding
import com.pplink.pagecall.dialog.CreateRoomDialog
import com.pplink.pagecall.model.RoomViewModel

class MainActivity : AppCompatActivity() {
    private val viewModel: RoomViewModel by viewModels()
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        changeRoomListView(true)

        viewModel.liveRooms.observe(this, { newList ->
            // 시작한 날짜를 기준으로 정렬한다.
            binding.liveRoomList.adapter =
                LiveRoomListAdapter(this, newList.sortedByDescending { it.start })
        })

        viewModel.closedRooms.observe(this, { newList ->
            // 종료한 날짜를 기준으로 정렬한다.
            binding.closedRoomList.adapter =
                ClosedRoomListAdapter(this, newList.sortedByDescending { it.end })
        })

        binding.isLiveSwitch.setOnCheckedChangeListener { _, isLive ->
            changeRoomListView(isLive)
        }

        binding.createRoomButton.setOnClickListener {
            CreateRoomDialog().show(supportFragmentManager, "CREATE_ROOM")
        }

        binding.searchRoomEditText.doAfterTextChanged {
            val (liveRooms, closedRoom) = viewModel.filterRooms(Regex(".*$it.*"))

            binding.liveRoomList.adapter =
                LiveRoomListAdapter(
                    this,
                    liveRooms
                        .sortedByDescending { room -> room.start })
            binding.closedRoomList.adapter =
                ClosedRoomListAdapter(
                    this,
                    closedRoom
                        .sortedByDescending { room -> room.end })
        }
    }

    private fun changeRoomListView(isLive: Boolean) {
        if (isLive) {
            binding.liveRoomList.visibility = View.VISIBLE
            binding.closedRoomList.visibility = View.GONE
        } else {
            binding.liveRoomList.visibility = View.GONE
            binding.closedRoomList.visibility = View.VISIBLE
        }
    }
}