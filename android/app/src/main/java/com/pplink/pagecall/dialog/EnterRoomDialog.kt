package com.pplink.pagecall.dialog

import android.app.AlertDialog
import android.app.Dialog
import android.content.DialogInterface
import android.content.Intent
import android.os.Bundle
import android.text.InputType
import android.util.Log
import android.view.View
import android.widget.EditText
import androidx.core.view.marginLeft
import androidx.fragment.app.DialogFragment
import androidx.lifecycle.lifecycleScope
import com.pplink.pagecall.R
import com.pplink.pagecall.WebViewActivity
import com.pplink.pagecall.model.EnterRoomRequest
import com.pplink.pagecall.network.PagecallApi
import kotlinx.coroutines.launch
import java.lang.Exception

class EnterRoomDialog : DialogFragment() {
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        super.onCreateDialog(savedInstanceState)
        return activity?.let {
            val args = requireArguments()

            val builder = AlertDialog.Builder(it)
            val inflator = requireActivity().layoutInflater
            val view = inflator.inflate(R.layout.dialog_enter_room, null)
            builder.setView(view).setPositiveButton("Enter",
                DialogInterface.OnClickListener { dialog, _ ->
                    val roomId = args.getString("roomId")!!
                    val nicknameEditText = view.findViewById<EditText>(R.id.nickname)

                    it.lifecycleScope.launch {
                        val enterRoomRequest =
                            EnterRoomRequest(nicknameEditText.text.toString())
                        val enterRoomResponse =
                            PagecallApi.retrofitService.enterRoom(roomId, enterRoomRequest)
                        val intent = Intent(it, WebViewActivity::class.java)

                        intent.putExtra(WebViewActivity.PAGECALL_URL, enterRoomResponse.url)
                        it.startActivity(intent)
                    }

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