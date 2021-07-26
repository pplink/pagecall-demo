//
//  ViewController.swift
//  PageCall
//
//  Created by Park Sehun on 2021/07/26.
//

import UIKit
import PageCallSDK

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        let pageCall = PageCall.sharedInstance()
        pageCall.delegate = self
            
        #if DEBUG
        #else
        // pagecall log
        pageCall.redirectLogToDocuments(withTimeInterval: 4)
        #endif
        
        let strURL = "https://pplink.net/call_new/peter0726"

        // PageCall MainViewController present
        pageCall.mainViewController!.modalPresentationStyle = .overFullScreen
        self.present(pageCall.mainViewController!, animated: true, completion: {
            pageCall.webViewLoadRequest(withURLString: strURL)
        })
    }
}

extension ViewController: PageCallDelegate {
    func pageCallDidClose() {
        print("pageCallDidClose")
    }

    func pageCallDidReceive(_ message: WKScriptMessage) {
        print("pageCallDidReceive message")
        
        /* sample JS
        var message = {
            command: 'finishedLoading',
            interval: 1
        };
        window.webkit.messageHandlers.pageCallSDK.postMessage(message);
        */
        
        if message.name == "pageCallSDK" {
            guard let dict = message.body as? [String: AnyObject],
                  let command = dict["command"] as? String,
                  let interval = dict["interval"] as? Int else {
                    return
            }
            print("pageCallDidReceiveScriptMessage command: \(command), interval: \(interval)")
        }
    }
    
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        print("webView decidePolicyFor navigationAction")
        decisionHandler(.allow)
    }
}
