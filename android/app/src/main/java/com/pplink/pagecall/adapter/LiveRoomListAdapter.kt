package com.pplink.pagecall.adapter

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.pplink.pagecall.MainActivity
import com.pplink.pagecall.R
import com.pplink.pagecall.dialog.CloseRoomDialog
import com.pplink.pagecall.dialog.EnterRoomDialog
import com.pplink.pagecall.model.LiveRoom
import java.time.format.DateTimeFormatter

class LiveRoomListAdapter(private val context: Context, private val dataset: List<LiveRoom>) :
    RecyclerView.Adapter<LiveRoomListAdapter.LiveRoomViewHolder>() {

    class LiveRoomViewHolder(private val view: View) : RecyclerView.ViewHolder(view) {
        val nameTextView: TextView = view.findViewById(R.id.room_name_text)
        val startTextView: TextView = view.findViewById(R.id.room_start_text)
        val enterRoomButton: Button = view.findViewById(R.id.enter_room_button)
        val closeRoomButton: Button = view.findViewById(R.id.close_room_button)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): LiveRoomViewHolder {
        val adapterLayout =
            LayoutInflater.from(parent.context).inflate(R.layout.live_room_item, parent, false)
        return LiveRoomViewHolder(adapterLayout)
    }

    override fun onBindViewHolder(holder: LiveRoomViewHolder, position: Int) {
        val room = dataset[position]

        holder.nameTextView.text = room.name

        val inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        val outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")

        holder.startTextView.text =
            "Started at ${outputFormatter.format(inputFormatter.parse(room.start))}"

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