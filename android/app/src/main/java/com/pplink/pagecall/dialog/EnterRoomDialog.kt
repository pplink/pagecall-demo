package com.pplink.pagecall.dialog

import android.app.AlertDialog
import android.app.Dialog
import android.content.DialogInterface
import android.os.Bundle
import android.text.InputType
import android.util.Log
import android.view.View
import android.widget.EditText
import androidx.core.view.marginLeft
import androidx.fragment.app.DialogFragment
import com.pplink.pagecall.R

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

                    Log.d("ENTER_DIALOG", nicknameEditText.text.toString())
                    //            val context = holder.itemView.context
//            val intent = Intent(context, WebViewActivity::class.java)
//            intent.putExtra(WebViewActivity.PAGECALL_URL, "https://app.pagecall.net/6108bf574b07620008c58b12?access_token=s_69mVIkmi8GsDHOH51zpVASI7l1yIrw")
//            context.startActivity(intent)

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