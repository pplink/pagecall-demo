package com.pplink.pagecall.dialog

import android.app.AlertDialog
import android.app.Dialog
import android.content.DialogInterface
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import androidx.fragment.app.DialogFragment
import androidx.fragment.app.activityViewModels
import com.pplink.pagecall.R
import com.pplink.pagecall.model.ClosedRoom
import com.pplink.pagecall.model.RoomViewModel

class CreateRoomDialog : DialogFragment() {
    private val viewModel: RoomViewModel by activityViewModels()

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        super.onCreateDialog(savedInstanceState)
        return activity?.let {

            val builder = AlertDialog.Builder(it)
            val inflator = requireActivity().layoutInflater
            val view = inflator.inflate(R.layout.dialog_create_room, null)

            builder.setView(view).setPositiveButton("Create",
                DialogInterface.OnClickListener { dialog, _ ->
                    val roomNameEditText = view.findViewById<EditText>(R.id.room_name)

                    dialog.cancel()
                })
                .setNegativeButton("Cancel",
                    DialogInterface.OnClickListener { dialog, _ ->
                        dialog.cancel()
                    })
            builder.create()
        } ?: throw IllegalStateException("Activity cannot be null")
    }
}