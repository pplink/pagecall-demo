package com.pplink.pagecall.dialog

import android.app.AlertDialog
import android.app.Dialog
import android.content.DialogInterface
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.DialogFragment

class CloseRoomDialog : DialogFragment() {
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
                        Log.d("CLOSE_DIALOG", roomId)
                        dialog.cancel()
                    })
            // Create the AlertDialog object and return it
            builder.create()
        } ?: throw IllegalStateException("Activity cannot be null")
    }
}