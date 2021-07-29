import Foundation

struct Room: Codable {
    var id: String
    var name: String
    var pcaRoomId: String
    var start: String?
    var end: String?
    var participant: Int?
    var createdAt: String?
    var updatedAt: String?
}

struct Rooms: Codable {
    var liveRooms: [Room]
    var closedRooms: [Room]
}

struct Constants {
    static let endpoint = "http://3.38.3.80:8080/"
}

struct User {
    var id: String
    var name: String
    var nickName: String
}
