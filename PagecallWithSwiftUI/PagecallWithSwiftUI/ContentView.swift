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
        NavigationView {
            VStack(spacing: 32) {
                Spacer()
                TextField("Type URL", text: $url)
                    .textFieldStyle(.roundedBorder)
                HStack {
                    Spacer()
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
                    NavigationLink {
                        PagecallEmbeddedView(url: url)
                    } label: {
                        Text("Open as a embedded view")
                    }
                    Spacer()
                }
                Spacer()
            }.padding()
        }
        .navigationViewStyle(.stack)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
