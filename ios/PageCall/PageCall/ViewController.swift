//
//  ViewController.swift
//  PageCall
//
//  Created by Park Sehun on 2021/07/26.
//

import UIKit
import PageCallSDK

class ViewController: UIViewController, UITableViewDelegate, UITableViewDataSource, UISearchBarDelegate {

    let tableView = UITableView()
    let searchController = UISearchController(searchResultsController: nil)
    var rooms = [Room]()
    var timer: Timer?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.title = ""
        navigationController?.navigationBar.prefersLargeTitles = true
        setupTableView()
        setupSearchBar()
        loadData()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        // FIXME: Test code
        /*
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
        })*/
    }
    
    func setupTableView() {
        view.addSubview(tableView)
        tableView.dataSource = self
        tableView.delegate = self
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")
        tableView.rowHeight = UITableView.automaticDimension
        tableView.translatesAutoresizingMaskIntoConstraints = false
        tableView.topAnchor.constraint(equalTo: view.topAnchor).isActive = true
        tableView.leftAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leftAnchor).isActive = true
        tableView.bottomAnchor.constraint(equalTo: view.bottomAnchor).isActive = true
        tableView.rightAnchor.constraint(equalTo: view.safeAreaLayoutGuide.rightAnchor).isActive = true
    }
    
    private func setupSearchBar() {
        definesPresentationContext = true
        navigationItem.searchController = self.searchController
        navigationItem.hidesSearchBarWhenScrolling = false
        searchController.searchBar.delegate = self
        let textFieldInsideSearchBar = searchController.searchBar.value(forKey: "searchField") as? UITextField
        textFieldInsideSearchBar?.placeholder = "Search by room name"
    }
    
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        if let position = searchController.searchBar.text {
            timer?.invalidate()
            timer = Timer.scheduledTimer(withTimeInterval: 0.2, repeats: false, block: { (_) in
                Service.shared.getResults(description: position) {[weak self] result in
                    switch result {
                    case .success(let results):
                        print(results)
                        self?.rooms = results
                        DispatchQueue.main.async {
                            self?.tableView.reloadData()
                        }
                    case .failure(let error):
                        DispatchQueue.main.async {
                            let alertPopUp = UIAlertController(title: error.rawValue, message: nil, preferredStyle: .alert)
                            alertPopUp.addAction(UIAlertAction(title: "OK", style: .default))
                            self?.present(alertPopUp, animated: true)
                        }
                        print(error)
                    }
                }
            })
        }
    }
    
    func loadData() {
            Service.shared.getResults(description: "rooms") { [weak self] result in
                switch result {
                case .success(let results):
                    print(results)
                    self?.rooms = results
                    DispatchQueue.main.async {
                        self?.tableView.reloadData()
                    }
                case .failure(let error):
                    DispatchQueue.main.async {
                        let alertPopUp = UIAlertController(title: error.rawValue, message: nil, preferredStyle: .alert)
                        alertPopUp.addAction(UIAlertAction(title: "OK", style: .default))
                        self?.present(alertPopUp, animated: true)
                    }
                    print(error)
                }
            }
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return rooms.count
    }

    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        // TODO: start pagecall
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell(style: .subtitle, reuseIdentifier: "cell")
        cell.textLabel?.text = rooms[indexPath.row].name
        cell.textLabel?.numberOfLines = -1
        cell.textLabel?.font = .preferredFont(forTextStyle: .headline)
        cell.detailTextLabel?.text = rooms[indexPath.row].createdAt
        cell.detailTextLabel?.font = .preferredFont(forTextStyle: .subheadline)
        cell.accessoryType = .disclosureIndicator
        cell.selectionStyle = .none
        return cell
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
