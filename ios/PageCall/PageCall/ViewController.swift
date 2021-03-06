//
//  ViewController.swift
//  PageCall
//
//  Created by Park Sehun on 2021/07/26.
//

import UIKit
import PageCallSDK
import Alamofire

enum segmentIndex: Int {
    case live = 0
    case closed = 1
}

class ViewController: UIViewController, UITableViewDelegate, UITableViewDataSource, UISearchBarDelegate, UISearchResultsUpdating {
    let tableView = UITableView()
    let searchController = UISearchController(searchResultsController: nil)
    var rooms = [Room]()
    var liveRooms = [Room]()
    var closedRooms = [Room]()
    var filteredRooms = [Room]()
    var nickname = UserDefaults.standard.string(forKey: "nickname") ?? ""
    var timer: Timer?
    var roomTextField: UITextField!
    var nicknameTextField: UITextField!
    var segmentControl: UISegmentedControl!
    
    // MARK: ViewController Cycle
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.title = "Rooms"
        navigationController?.navigationBar.prefersLargeTitles = true
        navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Create", style: .plain, target: self, action: #selector(onCreateRoom))
        
        if nickname.isEmpty {
            onCreateNickname()
        }
        
        setupTableView()
        setupSearchBar()
        setupSegmentedControl()
        
        loadData()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }
    
    // MARK: Setup
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
    
    func loadData() {
        Service.shared.getResults(description: "rooms") { [weak self] result in
            DispatchQueue.main.async {
                switch result {
                case .success(let results):
                    print(results)
                    self?.liveRooms = results.liveRooms
                    self?.closedRooms = results.closedRooms
                    
                    switch self?.segmentControl.selectedSegmentIndex {
                        case segmentIndex.live.rawValue:
                            self?.rooms = self!.liveRooms
                        case 1:
                            self?.rooms = self!.closedRooms
                        default:
                            self?.rooms = self!.liveRooms
                    }
                    
                    DispatchQueue.main.async {
                        self?.tableView.reloadData()
                    }
                case .failure(let error):
                    let alertPopUp = UIAlertController(title: error.rawValue, message: nil, preferredStyle: .alert)
                    alertPopUp.addAction(UIAlertAction(title: "OK", style: .default))
                    self?.present(alertPopUp, animated: true)
                    print(error)
                }
            }
        }
    }
    
    func setupSearchBar() {
        // Setup the Search Controller
        searchController.searchResultsUpdater = self
        searchController.obscuresBackgroundDuringPresentation = false
        navigationItem.searchController = searchController
        navigationItem.hidesSearchBarWhenScrolling = true
        definesPresentationContext = true
        
        // Setup the Scope Bar
        //searchController.searchBar.scopeButtonTitles = ["All", "Live", "Quit"]
        searchController.searchBar.delegate = self
        
        let textFieldInsideSearchBar = searchController.searchBar.value(forKey: "searchField") as? UITextField
        textFieldInsideSearchBar?.placeholder = "Search by room name"
    }
    
    func setupSegmentedControl() {
        let titles = ["Live", "Closed"]
        segmentControl = UISegmentedControl(items: titles)
        //segmentControl.tintColor = .white
        //segmentControl.backgroundColor = .black
        segmentControl.selectedSegmentIndex = segmentIndex.live.rawValue
        for index in 0...titles.count-1 {
            segmentControl.setWidth(120, forSegmentAt: index)
        }
        segmentControl.sizeToFit()
        segmentControl.addTarget(self, action: #selector(onSegmentedValueChanged), for: .valueChanged)
        segmentControl.sendActions(for: .valueChanged)
        navigationItem.titleView = segmentControl
    }
    
    // MARK: Private Func
    func convertTimestamp(dateString:String) -> String {
        
        let isoDateFormatter = ISO8601DateFormatter()
        isoDateFormatter.timeZone = TimeZone(secondsFromGMT: 0)
        isoDateFormatter.formatOptions = [
            .withFullDate,
            .withFullTime,
            .withDashSeparatorInDate,
            .withFractionalSeconds]

        if let realDate = isoDateFormatter.date(from: dateString) {
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "yyyy/MM/dd a hh:mm"
            dateFormatter.timeZone = TimeZone.autoupdatingCurrent
            dateFormatter.locale = Locale.current
            let resultString:String = dateFormatter.string(from: realDate)
            return resultString
        }
        
        return ""
    }
    
    func isFiltering() -> Bool {
        let searchBarScopeIsFiltering = searchController.searchBar.selectedScopeButtonIndex != 0
        return searchController.isActive && (!searchBarIsEmpty() || searchBarScopeIsFiltering)
    }
    
    func isLiveTableView() -> Bool {
        if self.segmentControl.selectedSegmentIndex == segmentIndex.live.rawValue {
            return true
        }
        return false
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
    
    // MARK: Action
    @objc func onCreateNickname() {
        let alertPopUp = UIAlertController(title: "Nickname", message: nil, preferredStyle: .alert)
        
        // error message
        let label = UILabel(frame: CGRect(x: 0, y: 40, width: 270, height:18))
        label.textAlignment = .center
        label.textColor = .red
        label.font = label.font.withSize(12)
        alertPopUp.view.addSubview(label)
        label.isHidden = true
        
        let confirm = UIAlertAction(title: "Confirm", style: .default, handler: { (action) -> Void in
            if let userInput = self.nicknameTextField!.text {
                if userInput == "" {
                    label.text = ""
                    label.text = "Please enter nickname to create."
                    label.isHidden = false
                    self.present(alertPopUp, animated: true, completion: nil)

                } else {
                    print("Create button success block called do stuff here....")
                    self.nickname = userInput
                    UserDefaults.standard.set(self.nickname, forKey: "nickname")
                }
            }
        })

        //Add OK and Cancel button to dialog message
        alertPopUp.addAction(confirm)
        
        // Add Input TextField to dialog message
        alertPopUp.addTextField { (textField) -> Void in
            self.nicknameTextField = textField
            self.nicknameTextField?.placeholder = "Please enter nickname"
        }
        
        self.present(alertPopUp, animated: true)
    }
    
    @objc func onCreateRoom() {
        let alertPopUp = UIAlertController(title: "New Room", message: nil, preferredStyle: .alert)
        
        // error message
        let label = UILabel(frame: CGRect(x: 0, y: 40, width: 270, height:18))
        label.textAlignment = .center
        label.textColor = .red
        label.font = label.font.withSize(12)
        alertPopUp.view.addSubview(label)
        label.isHidden = true
        
        let cancel = UIAlertAction(title: "Cancel", style: .default) { (action) -> Void in
            print("Cancel button tapped")
        }
        
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
                    self.createRoom(name: userInput)
                }
            }
        })

        //Add OK and Cancel button to dialog message
        alertPopUp.addAction(cancel)
        alertPopUp.addAction(create)
        
        // Add Input TextField to dialog message
        alertPopUp.addTextField { (textField) -> Void in
            self.roomTextField = textField
            self.roomTextField?.placeholder = "Please enter room name"
        }
        
        self.present(alertPopUp, animated: true)
    }
    
    func onQuitRoom(indexPath:IndexPath) {
        let alertPopUp = UIAlertController(title: "Do you want to quit?", message: "", preferredStyle: .alert)
        
        // error message
        let label = UILabel(frame: CGRect(x: 0, y: 40, width: 270, height:18))
        label.textAlignment = .center
        label.textColor = .red
        label.font = label.font.withSize(12)
        alertPopUp.view.addSubview(label)
        label.text = "All participants will be ended together."
        label.isHidden = false
        
        let cancel = UIAlertAction(title: "Cancel", style: .default) { (action) -> Void in
            print("Cancel button tapped")
        }
        
        let confirm = UIAlertAction(title: "Confirm", style: .default, handler: { (action) -> Void in
            print("Confirm button tapped")
            let room: Room
            if self.isFiltering() {
                room = self.filteredRooms[indexPath.row]
            } else {
                room = self.rooms[indexPath.row]
            }
            Service.shared.quitRoom(room: room) { [weak self] result in
                switch result {
                case .success(let room):
                    print("QuitRoom success=\(room)");
                    DispatchQueue.main.async {
                        self?.tableView.beginUpdates()
                        
                        // remove all
                        if self!.isFiltering() {
                            let filteredRoom = self?.filteredRooms[indexPath.row];
                            
                            // remove rooms object
                            if let i = self?.rooms.firstIndex(where: { $0.id == filteredRoom?.id }) {
                                self?.rooms.remove(at: i); // remove rooms
                            }
                            
                            // remove filteredRooms object
                            self?.filteredRooms.remove(at: indexPath.row);
                        } else {
                            // remove rooms object
                            self?.rooms.remove(at: indexPath.row);
                        }
                        
                        self?.tableView.deleteRows(at: [indexPath], with: .fade)
                        self?.tableView.endUpdates()
                    }
                case .failure(let error):
                    DispatchQueue.main.async {
                        let alertPopUp = UIAlertController(title: error.rawValue, message: nil, preferredStyle: .alert)
                        alertPopUp.addAction(UIAlertAction(title: "OK", style: .default))
                        self?.present(alertPopUp, animated: true)
                    }
                }
            }
        })

        //Add OK and Cancel button to dialog message
        alertPopUp.addAction(cancel)
        alertPopUp.addAction(confirm)

        self.present(alertPopUp, animated: true)
    }
    
    @objc func onSegmentedValueChanged(_ sender:UISegmentedControl!) {
        print("Selected Segment Index is : \(sender.selectedSegmentIndex)")
        loadData()
    }
    
    // MARK: Room
    func createRoom(name:String) {
        Service.shared.createRoom(name: name) { [weak self] result in
            switch result {
            case .success(let room):
                print("createRoom success=\(room)");
                DispatchQueue.main.async {
                    self?.loadData()
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
    
    func goRoom(room:Room) {
        Service.shared.requestRoomUrl(room: room, nickname: self.nickname) { [weak self] result in
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
    
    // MARK: SearchBar
    func filterContentForSearchText(_ searchText: String) {
        filteredRooms = rooms.filter({(room : Room) -> Bool in
            if searchBarIsEmpty() {
                return false
            } else {
                return room.name.lowercased().contains(searchText.lowercased())
            }
        })
        tableView.reloadData()
    }
    
    func searchBarIsEmpty() -> Bool {
        return searchController.searchBar.text?.isEmpty ?? true
    }
    
    // MARK: UISearchBarDelegate
    func searchBar(_ searchBar: UISearchBar, selectedScopeButtonIndexDidChange selectedScope: Int) {
        filterContentForSearchText(searchBar.text!)
    }
    
    func updateSearchResults(for searchController: UISearchController) {
        //let searchBar = searchController.searchBar
        //let scope = searchBar.scopeButtonTitles![searchBar.selectedScopeButtonIndex]
        filterContentForSearchText(searchController.searchBar.text!)
    }
    
    // MARK: UITableViewDataSource, UITableViewDelegate
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if isFiltering() {
          return filteredRooms.count
        }
        return rooms.count
    }

    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if isLiveTableView() {
            let room: Room
            if isFiltering() {
                room = filteredRooms[indexPath.row]
            } else {
                room = rooms[indexPath.row]
            }
            goRoom(room: room)
        }
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell(style: .subtitle, reuseIdentifier: "cell")
        let room: Room
        if isFiltering() {
            room = filteredRooms[indexPath.row]
        } else {
            room = rooms[indexPath.row]
        }
        
        cell.textLabel?.text = room.name
        cell.textLabel?.numberOfLines = -1
        cell.textLabel?.font = .preferredFont(forTextStyle: .headline)
        cell.detailTextLabel?.text = "Created at \(convertTimestamp(dateString: room.createdAt!))"
        cell.detailTextLabel?.font = .preferredFont(forTextStyle: .subheadline)
        cell.detailTextLabel?.textColor = .gray

        if isLiveTableView() {
            cell.accessoryType = .disclosureIndicator
        } else {
            cell.accessoryType = .none
        }

        cell.selectionStyle = .none
        return cell
    }
    
    func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        return isLiveTableView()
    }

    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if (editingStyle == UITableViewCell.EditingStyle.delete) {
            onQuitRoom(indexPath: indexPath)
        }
    }
    
    func tableView(_ tableView: UITableView, titleForDeleteConfirmationButtonForRowAt indexPath: IndexPath) -> String? {
        return "Close"
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
