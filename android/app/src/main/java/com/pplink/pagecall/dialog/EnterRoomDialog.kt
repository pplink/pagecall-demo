package com.pplink.pagecall.dialog

import android.app.AlertDialog
import android.app.Dialog
import android.content.DialogInterface
import android.content.Intent
import android.os.Bundle
import android.widget.EditText
import androidx.fragment.app.DialogFragment
import androidx.lifecycle.lifecycleScope
import com.pplink.pagecall.R
import com.pplink.pagecall.WebViewActivity
import com.pplink.pagecall.model.EnterRoomRequest
import com.pplink.pagecall.network.PagecallApi
import kotlinx.coroutines.launch

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
                    // 만약 닉네임이 빈 문자열이면, 페이지콜 자체에서 랜덤한 닉네임으로 강의실 입장 처리한다.
                    val nicknameEditText = view.findViewById<EditText>(R.id.nickname_edit_text)

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