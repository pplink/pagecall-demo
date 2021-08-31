package com.pplink.pagecall.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.pplink.pagecall.R
import com.pplink.pagecall.model.ClosedRoom
import com.pplink.pagecall.model.LiveRoom

class ClosedRoomAdapter(private val context: Context, private val dataset: List<ClosedRoom>): RecyclerView.Adapter<ClosedRoomAdapter.ClosedRoomViewHolder>() {
    class ClosedRoomViewHolder(private val view: View): RecyclerView.ViewHolder(view) {
        val nameTextView: TextView = view.findViewById(R.id.item_name)
        val startTextView: TextView = view.findViewById(R.id.item_start)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ClosedRoomAdapter.ClosedRoomViewHolder {
        val adapterLayout = LayoutInflater.from(parent.context).inflate(R.layout.live_room_item, parent, false)
        return ClosedRoomAdapter.ClosedRoomViewHolder(adapterLayout)
    }

    override fun onBindViewHolder(holder: ClosedRoomViewHolder, position: Int) {
        val room = dataset[position]
        holder.nameTextView.text = room.name
        holder.startTextView.text = room.start
    }

    override fun getItemCount(): Int {
        return dataset.size
    }
}