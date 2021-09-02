package com.pplink.pagecall.dialog

import android.app.AlertDialog
import android.app.Dialog
import android.content.DialogInterface
import android.os.Bundle
import android.util.Log
import androidx.activity.viewModels
import androidx.fragment.app.DialogFragment
import androidx.fragment.app.activityViewModels
import androidx.fragment.app.viewModels
import androidx.recyclerview.widget.RecyclerView
import com.pplink.pagecall.MainActivity
import com.pplink.pagecall.R
import com.pplink.pagecall.adapter.ClosedRoomAdapter
import com.pplink.pagecall.adapter.LiveRoomAdapter
import com.pplink.pagecall.databinding.ActivityMainBinding
import com.pplink.pagecall.model.ClosedRoom
import com.pplink.pagecall.model.RoomViewModel

class CloseRoomDialog : DialogFragment() {
    private val viewModel: RoomViewModel by activityViewModels()

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        super.onCreateDialog(savedInstanceState)
        return activity?.let {
            // Use the Builder class for convenient dialog construction
            val args = requireArguments()

            val builder = AlertDialog.Builder(it)
            builder.setTitle("Close the room")
                .setMessage("Are you sure you want to close the room? All users in room will leave.")
                .setNegativeButton("Cancel",
                    DialogInterface.OnClickListener { dialog, _ ->
                        dialog.cancel()
                    })
                .setPositiveButton("Close",
                    DialogInterface.OnClickListener { dialog, _ ->
                        val roomId = args.getString("roomId")!!
                        val room = viewModel.findLiveRoomById(roomId)

                        room?.let {
                            val closedRoom = ClosedRoom(room.id, room.name, room.pcaRoomId, room.start, "something", room.participant, room.createdAt, room.updatedAt)
                            viewModel.removeLiveRoom(room)
                            viewModel.addClosedRoom(closedRoom)
                        }

                        val liveRoomList = it.findViewById<RecyclerView>(R.id.live_room_list)
                        liveRoomList.adapter!!.notifyDataSetChanged()
                        val closedRoomList = it.findViewById<RecyclerView>(R.id.closed_room_list)
                        closedRoomList.adapter!!.notifyDataSetChanged()

                        dialog.cancel()
                    })
            // Create the AlertDialog object and return it
            builder.create()
        } ?: throw IllegalStateException("Activity cannot be null")
    }
}