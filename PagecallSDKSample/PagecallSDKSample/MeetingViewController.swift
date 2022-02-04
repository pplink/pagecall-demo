import UIKit
import WebKit
import PagecallSDK

class MeetingViewController: UIViewController, WKUIDelegate {
    public var url: URL?
    var webView: PagecallWebView?
    
    override func viewDidLoad() {
        super.viewDidLoad();
        if let url = url {
            let webView = PagecallWebView(frame: CGRect.zero);
            webView.uiDelegate = self
            webView.load(URLRequest(url: url))
            self.view.addSubview(webView)
            self.webView = webView;
            
            webView.translatesAutoresizingMaskIntoConstraints = false;
            webView.topAnchor.constraint(equalTo: self.view.topAnchor, constant: 80.0).isActive = true;
            webView.bottomAnchor.constraint(equalTo: self.view.bottomAnchor, constant: -20.0).isActive = true;
            webView.leadingAnchor.constraint(equalTo: self.view.leadingAnchor, constant: 20.0).isActive = true;
            webView.trailingAnchor.constraint(equalTo: self.view.trailingAnchor, constant: -20.0).isActive = true;
        }
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        // If it is not called, the webView can still have the access to microphone or camera
        webView?.dispose();
        webView = nil;
    }
    
    @available(iOS 15.0, *)
    func webView(_ webView: WKWebView, requestMediaCapturePermissionFor origin: WKSecurityOrigin, initiatedByFrame frame: WKFrameInfo, type: WKMediaCaptureType, decisionHandler: @escaping (WKPermissionDecision) -> Void) {
        decisionHandler(.grant)
    }
}
