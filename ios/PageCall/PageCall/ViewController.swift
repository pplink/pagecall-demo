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
        
        let pageCall = PageCall.sharedInstance()
        //pageCall.delegate = self
            
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

