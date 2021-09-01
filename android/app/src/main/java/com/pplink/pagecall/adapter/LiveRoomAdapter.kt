package com.pplink.pagecall.adapter

import android.app.AlertDialog
import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.fragment.app.FragmentManager
import androidx.recyclerview.widget.RecyclerView
import com.pplink.pagecall.MainActivity
import com.pplink.pagecall.R
import com.pplink.pagecall.WebViewActivity
import com.pplink.pagecall.dialog.CloseRoomDialog
import com.pplink.pagecall.dialog.EnterRoomDialog
import com.pplink.pagecall.model.LiveRoom

class LiveRoomAdapter(private val context: Context, private val dataset: List<LiveRoom>) :
    RecyclerView.Adapter<LiveRoomAdapter.LiveRoomViewHolder>() {
    class LiveRoomViewHolder(private val view: View) : RecyclerView.ViewHolder(view) {
        val nameTextView: TextView = view.findViewById(R.id.room_name)
        val startTextView: TextView = view.findViewById(R.id.room_start)
        val enterRoomButton: Button = view.findViewById(R.id.enter_room)
        val closeRoomButton: Button = view.findViewById(R.id.close_room)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): LiveRoomViewHolder {
        val adapterLayout =
            LayoutInflater.from(parent.context).inflate(R.layout.live_room_item, parent, false)
        return LiveRoomViewHolder(adapterLayout)
    }

    override fun onBindViewHolder(holder: LiveRoomViewHolder, position: Int) {
        val room = dataset[position]
        holder.nameTextView.text = room.name
        holder.startTextView.text = room.start

        val activity = context as MainActivity
        val manager = activity.supportFragmentManager
        val bundle = Bundle()
        bundle.putString("roomId", room.id)

        holder.enterRoomButton.setOnClickListener {
            val dialog = EnterRoomDialog()
            dialog.arguments = bundle
            dialog.show(manager, "ENTER_ROOM")
        }

        holder.closeRoomButton.setOnClickListener {
            val dialog = CloseRoomDialog()
            dialog.arguments = bundle
            dialog.show(manager, "CLOSE_ROOM")
        }
    }

    override fun getItemCount(): Int {
        return dataset.size
    }
}