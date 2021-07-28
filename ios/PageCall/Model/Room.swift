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
