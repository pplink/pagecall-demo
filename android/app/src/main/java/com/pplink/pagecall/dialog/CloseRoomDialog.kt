package com.pplink.pagecall.dialog

import android.app.AlertDialog
import android.app.Dialog
import android.content.DialogInterface
import android.os.Bundle
import androidx.fragment.app.DialogFragment
import androidx.fragment.app.activityViewModels
import com.pplink.pagecall.model.RoomViewModel

class CloseRoomDialog : DialogFragment() {
    private val viewModel: RoomViewModel by activityViewModels()

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        super.onCreateDialog(savedInstanceState)
        return activity?.let {
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

                        viewModel.closeLiveRoom(roomId)

                        dialog.cancel()
                    })
            builder.create()
        } ?: throw IllegalStateException("Activity cannot be null")
    }
}