//
//  ContentView.swift
//  PagecallWithSwiftUI
//
//  Created by Jaeseong Seo on 2021/11/10.
//

import SwiftUI
import PageCallSDK

struct ContentView: View {
    @State private var url = "https://app.pagecall.net/roomId"
    @State private var isModalOpen = false
    var body: some View {
        VStack(spacing: 32) {
            Spacer()
            TextField("Type URL", text: $url)
                .textFieldStyle(.roundedBorder)
            Button {
                isModalOpen = true
            } label: {
                Text("Open as a modal")
            }.fullScreenCover(isPresented: $isModalOpen) {
                isModalOpen = false
            } content: {
                PagecallView().onAppear {
                    PageCall.sharedInstance().webViewLoadRequest(withURLString: url)
                }
            }
            Spacer()
        }.padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
