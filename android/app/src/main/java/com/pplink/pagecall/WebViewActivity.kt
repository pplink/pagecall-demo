package com.pplink.pagecall

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import com.pplink.pagecall.databinding.ActivityWebViewBinding
import com.pplink.pagecall.sdk.Pagecall
import com.pplink.pagecall.sdk.PagecallClient

class WebViewActivity : AppCompatActivity() {
    companion object {
        const val PAGECALL_URL = "pagecall_url"
    }

    private lateinit var _binding: ActivityWebViewBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        supportActionBar?.hide()
        _binding = ActivityWebViewBinding.inflate(layoutInflater)
        setContentView(_binding.root)

        val url = intent?.extras?.getString(PAGECALL_URL).toString()

        val customJavascript = "window.close=()=>{Android.onExit();};"

        setPagecall(url, null, customJavascript)
    }

    private fun setPagecall(url: String, html: String?, customJavascript: String?) {
        val pagecall = Pagecall.newInstance(url, html)
        // 페이지콜 나가기 후, 정중앙의 X 버튼 클릭 시 onExit 이벤트가 발생.
        pagecall.pagecallClient = object: PagecallClient() {
            override fun onExit() {
                this@WebViewActivity.finish()
            }
        }
        pagecall.customJavascript = customJavascript

        val transaction = supportFragmentManager.beginTransaction()
        transaction.replace(R.id.pagecall_view, pagecall, "pagecall")
        transaction.addToBackStack(null)
        transaction.commit()
    }
}