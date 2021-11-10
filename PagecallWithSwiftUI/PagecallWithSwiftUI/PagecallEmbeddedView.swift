//
//  PagecallEmbeddedView.swift
//  PagecallWithSwiftUI
//
//  Created by Jaeseong Seo on 2021/11/10.
//

import SwiftUI
import PageCallSDK

struct PagecallEmbeddedView: View {
    let url: String
    var body: some View {
        VStack {
            PagecallView().onAppear {
                PageCall.sharedInstance().webViewLoadRequest(withURLString: url)
            }
            Text("You can add custom elements")
        }
    }
}

struct PagecallEmbeddedView_Previews: PreviewProvider {
    static let sampleUrl = "https://app.pagecall.net/618ba675e0cb33f4af7f4184"
    static var previews: some View {
        PagecallEmbeddedView(url: sampleUrl)
    }
}
