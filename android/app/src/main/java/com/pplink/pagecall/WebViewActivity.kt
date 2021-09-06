package com.pplink.pagecall

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.*
import com.pplink.pagecall.databinding.ActivityWebViewBinding
import android.webkit.WebView
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import java.lang.Exception


private const val PERMISSION_REQUEST_CODE = 1888

class WebViewActivity : AppCompatActivity() {
    companion object {
        const val PAGECALL_URL = "pagecall_url"
    }

    private lateinit var _binding: ActivityWebViewBinding
    private var _filePathCallback: ValueCallback<Array<Uri>>? = null

    private val filterActivityLauncher: ActivityResultLauncher<Intent> =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) {
            // WebView 내부에서 파일 선택자를 열기 위한 로직
            if (it.resultCode == Activity.RESULT_OK && it.data != null) {
                var results: Array<Uri>? = null

                it.data?.let { data ->
                    data.dataString?.let { dataString ->
                        results = arrayOf(Uri.parse(dataString))
                    }
                }
                _filePathCallback!!.onReceiveValue(results)
            } else {
                // 에러 또는 선택된 파일이 없더라도 반드시 초기화 해주어야 한다.
                // 그렇지 않으면 다시 파일 선택자가 열리지 않는다.
                _filePathCallback!!.onReceiveValue(null)
            }

            _filePathCallback = null
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        supportActionBar?.hide()
        _binding = ActivityWebViewBinding.inflate(layoutInflater)
        setContentView(_binding.root)

        val url = intent?.extras?.getString(PAGECALL_URL).toString()
        val webView = _binding.webView

        requestPermissionsForPagecall()

        webView.apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.allowFileAccess = true
            settings.allowContentAccess = true
            webChromeClient = object : WebChromeClient() {
                override fun onPermissionRequest(request: PermissionRequest?) {
                    request?.grant(request.resources)
                }

                override fun onCloseWindow(window: WebView?) {
                    super.onCloseWindow(window)
                    // TODO Pagecall Client 에서 Android WebView 케이스에서도 window.close() 를 호출해 주도록 업데이트 하면 자동으로 아래 코드가 호출 됨.
                    // 현재는 Pagecall 나가기 후, 정가운데 이미지를 눌러야 동작한다.
                    this@WebViewActivity.finish()
                }

                override fun onShowFileChooser(
                    webView: WebView?,
                    filePathCallback: ValueCallback<Array<Uri>>?,
                    fileChooserParams: FileChooserParams?
                ): Boolean {
                    if (_filePathCallback != null) {
                        _filePathCallback!!.onReceiveValue(null)
                        _filePathCallback = null
                    }

                    try {
                        _filePathCallback = filePathCallback
                        val intent = Intent()
                        intent.apply {
                            action = Intent.ACTION_GET_CONTENT
                            addCategory(Intent.CATEGORY_OPENABLE)
                            type = "*/*"
                            putExtra(Intent.EXTRA_ALLOW_MULTIPLE, fileChooserParams!!.acceptTypes)
                        }

                        filterActivityLauncher.launch(intent)
                    } catch (e: Exception) {
                        _filePathCallback!!.onReceiveValue(null)
                        _filePathCallback = null
                    }

                    return true
                }
            }
        }

        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true)
        webView.loadUrl(url)
    }

    private fun requestPermissionsForPagecall() {
        if (
            checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED ||
            checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED ||
            checkSelfPermission(Manifest.permission.MODIFY_AUDIO_SETTINGS) != PackageManager.PERMISSION_GRANTED
        ) {
            requestPermissions(
                arrayOf(
                    Manifest.permission.CAMERA,
                    Manifest.permission.RECORD_AUDIO,
                    Manifest.permission.MODIFY_AUDIO_SETTINGS
                ), PERMISSION_REQUEST_CODE
            )
        }
    }
}