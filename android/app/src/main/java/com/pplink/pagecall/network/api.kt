package com.pplink.pagecall.network

import com.pplink.pagecall.model.*
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.*

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
    suspend fun getRooms(): GetRoomsResponse

    @POST("rooms")
    suspend fun createRoom(@Body CreateRoomRequest: CreateRoomRequest): CreateRoomResponse

    @POST("rooms/{id}")
    suspend fun enterRoom(
        @Path("id") id: String,
        @Body EnterRoomRequest: EnterRoomRequest
    ): EnterRoomResponse

    @PUT("rooms/{id}")
    suspend fun closeRoom(@Path("id") id: String): CloseRoomResponse
}

object PagecallApi {
    val retrofitService: PagecallApiService by lazy {
        retrofit.create(PagecallApiService::class.java)
    }
}