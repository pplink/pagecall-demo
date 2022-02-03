//
//  ViewController.swift
//  PagecallEmbedTest
//
//  Created by Jerry on 2022/02/03.
//

import UIKit
import PageCallSDK

class ViewController: UIViewController {
    let pagecall = PageCall.sharedInstance();
    @IBOutlet weak var containerView: UIView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        guard let pagecallVc = pagecall.mainViewController, let pagecallView = pagecallVc.view else {
            print("Pagecall mainViewController not found")
            return;
        }
        
        pagecallVc.willMove(toParent: self)
        self.containerView.addSubview(pagecallView);
        self.addChild(pagecallVc);
        pagecallVc.didMove(toParent: self)
        
        PageCall.sharedInstance().webViewLoadRequest(withURLString: "https://demo.pagecall.net/join/jerry/220203")
    }
}

