package com.pplink.pagecall.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.pplink.pagecall.R
import com.pplink.pagecall.model.LiveRoom

class LiveRoomAdapter(private val context: Context, private val dataset: List<LiveRoom>): RecyclerView.Adapter<LiveRoomAdapter.LiveRoomViewHolder>() {
    class LiveRoomViewHolder(private val view: View): RecyclerView.ViewHolder(view) {
        val nameTextView: TextView = view.findViewById(R.id.room_name)
        val startTextView: TextView = view.findViewById(R.id.room_start)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): LiveRoomViewHolder {
        val adapterLayout = LayoutInflater.from(parent.context).inflate(R.layout.live_room_item, parent, false)
        return LiveRoomViewHolder(adapterLayout)
    }

    override fun onBindViewHolder(holder: LiveRoomViewHolder, position: Int) {
        val room = dataset[position]
        holder.nameTextView.text = room.name
        holder.startTextView.text = room.start
    }

    override fun getItemCount(): Int {
        return dataset.size
    }
}