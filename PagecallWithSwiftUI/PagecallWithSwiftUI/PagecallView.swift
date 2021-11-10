//
//  PagecallView.swift
//  PagecallWithSwiftUI
//
//  Created by Jaeseong Seo on 2021/11/10.
//

import UIKit
import SwiftUI
import PageCallSDK

struct PagecallView: UIViewControllerRepresentable {
    func makeCoordinator() -> Coordinator {
        return Coordinator()
    }
    
    func makeUIViewController(context: Context) -> UIViewController {
        let pagecall = PageCall.sharedInstance()
        let pagecallViewController: UIViewController = pagecall.mainViewController!
        pagecall.delegate = context.coordinator
        return pagecallViewController
    }
    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {
    }
    
    class Coordinator: NSObject, PageCallDelegate {
        // Events are delegated here
        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            decisionHandler(.allow)
        }
        
    }
}

struct PagecallView_Previews: PreviewProvider {
    static let sampleUrl = "https://app.pagecall.net/618ba675e0cb33f4af7f4184"
    static var previews: some View {
        PagecallView().onAppear {
            PageCall.sharedInstance().webViewLoadRequest(withURLString: sampleUrl)
        }
    }
}
