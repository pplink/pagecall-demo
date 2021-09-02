package com.pplink.pagecall.network

import com.pplink.pagecall.model.LiveRoom
import com.pplink.pagecall.model.RoomList
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.GET

private const val BASE_URL = "http://3.38.3.80:8080"
private val moshi = Moshi.Builder()
    .add(KotlinJsonAdapterFactory())
    .build()
private val retrofit = Retrofit.Builder()
    .addConverterFactory(MoshiConverterFactory.create(moshi))
    .baseUrl(BASE_URL)
    .build()

interface PagecallApiService {
    @GET("rooms")
    suspend fun getRooms(): RoomList
}

object PagecallApi {
    val retrofitService: PagecallApiService by lazy {
        retrofit.create(PagecallApiService::class.java)
    }
}