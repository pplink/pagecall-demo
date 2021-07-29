//
//  ViewController.swift
//  PageCall
//
//  Created by Park Sehun on 2021/07/26.
//

import UIKit
import PageCallSDK
import Alamofire

class ViewController: UIViewController, UITableViewDelegate, UITableViewDataSource, UISearchBarDelegate {

    let tableView = UITableView()
    let searchController = UISearchController(searchResultsController: nil)
    var rooms = [Room]()
    var user = User(id: "defsehun", name: "Park Sehun", nickName: "peter") // FIXME: test code
    var timer: Timer?
    var roomTextField: UITextField!
    
    // MARK: ViewController Cycle
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.title = "Room List"
        navigationController?.navigationBar.prefersLargeTitles = true
        navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Create", style: .plain, target: self, action: #selector(createRoom))
            
        setupTableView()
        setupSearchBar()
        loadData()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }
    
    @objc func createRoom() {
        DispatchQueue.main.async {
            let alertPopUp = UIAlertController(title: "New Room", message: nil, preferredStyle: .alert)
            
            // error message
            let label = UILabel(frame: CGRect(x: 0, y: 40, width: 270, height:18))
            label.textAlignment = .center
            label.textColor = .red
            label.font = label.font.withSize(12)
            alertPopUp.view.addSubview(label)
            label.isHidden = true
            
            let create = UIAlertAction(title: "Create", style: .default, handler: { (action) -> Void in
                if let userInput = self.roomTextField!.text {
                    if userInput == "" {
                        label.text = ""
                        label.text = "Please enter room name to create."
                        label.isHidden = false
                        self.present(alertPopUp, animated: true, completion: nil)

                    }
//                    else if self.haveSameRoom(createdRoom: userInput){
//                        label.text = ""
//                        label.text = "You've already created room with this name."
//                        label.isHidden = false
//                        self.present(alertPopUp, animated: true, completion: nil)
//                    }
                    else{
                        print("Create button success block called do stuff here....")
                    }
                }
            })
            
            let cancel = UIAlertAction(title: "Cancel", style: .default) { (action) -> Void in
                print("Cancel button tapped")
            }

            //Add OK and Cancel button to dialog message
            alertPopUp.addAction(create)
            alertPopUp.addAction(cancel)
            
            // Add Input TextField to dialog message
            alertPopUp.addTextField { (textField) -> Void in
                self.roomTextField = textField
                self.roomTextField?.placeholder = "Please enter room name"
            }
            
            self.present(alertPopUp, animated: true)
        }
    }
    
    // MARK: TableView Func
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
    
    // MARK: PageCall
    func loadPageCall(strUrl: String) {
        DispatchQueue.main.async {
            let pageCall = PageCall.sharedInstance()
            pageCall.delegate = self
                
            #if DEBUG
            #else
            // pagecall log
            pageCall.redirectLogToDocuments(withTimeInterval: 4)
            #endif
            
            // PageCall MainViewController present
            pageCall.mainViewController!.modalPresentationStyle = .overFullScreen
            self.present(pageCall.mainViewController!, animated: true, completion: {
                pageCall.webViewLoadRequest(withURLString: strUrl)
            })
        }
    }
    
    // MARK: UITableView
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return rooms.count
    }

    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        // 강의실 입장
        Service.shared.requestRoomUrl(room: rooms[indexPath.row], nickname: user.nickName) { [weak self] result in
            switch result {
            case .success(let url):
                DispatchQueue.main.async {
                    self?.loadPageCall(strUrl: url)
                    self?.tableView.reloadData()
                }
            case .failure(let error):
                DispatchQueue.main.async {
                    let alertPopUp = UIAlertController(title: error.rawValue, message: nil, preferredStyle: .alert)
                    alertPopUp.addAction(UIAlertAction(title: "OK", style: .default))
                    self?.present(alertPopUp, animated: true)
                }
            }
        }
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

// MARK: PageCallDelegate
extension ViewController: PageCallDelegate {
    func pageCallDidClose() {
        print("pageCallDidClose")
    }

    func pageCallDidReceive(_ message: WKScriptMessage) {
        print("pageCallDidReceive message")
    }
    
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        print("webView decidePolicyFor navigationAction")
        decisionHandler(.allow)
    }
}
