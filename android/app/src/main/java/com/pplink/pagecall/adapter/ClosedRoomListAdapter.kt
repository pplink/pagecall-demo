package com.pplink.pagecall.adapter

import android.content.Context
import android.provider.Settings.Global.getString
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.pplink.pagecall.R
import com.pplink.pagecall.model.ClosedRoom
import java.text.SimpleDateFormat
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*

class ClosedRoomListAdapter(private val context: Context, private val dataset: List<ClosedRoom>) :
    RecyclerView.Adapter<ClosedRoomListAdapter.ClosedRoomViewHolder>() {
    class ClosedRoomViewHolder(private val view: View) : RecyclerView.ViewHolder(view) {
        val nameTextView: TextView = view.findViewById(R.id.room_name)
        val startTextView: TextView = view.findViewById(R.id.room_start)
        val endTextView: TextView = view.findViewById(R.id.room_end)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ClosedRoomViewHolder {
        val adapterLayout =
            LayoutInflater.from(parent.context).inflate(R.layout.closed_room_item, parent, false)
        return ClosedRoomViewHolder(adapterLayout)
    }

    override fun onBindViewHolder(holder: ClosedRoomViewHolder, position: Int) {
        val room = dataset[position]
        holder.nameTextView.text = room.name

        val inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        val outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")

        holder.startTextView.text =
            "Started at ${outputFormatter.format(inputFormatter.parse(room.start))}"
        holder.endTextView.text =
            "Closed at ${outputFormatter.format(inputFormatter.parse(room.end))}"
    }

    override fun getItemCount(): Int {
        return dataset.size
    }
}