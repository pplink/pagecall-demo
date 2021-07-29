import Foundation
import Alamofire

class Service {
    static let shared = Service()
    
    func getResults(description: String, completed: @escaping (Result<[Room], ErrorMessage>) -> Void) {
        let urlString = "\(Constants.endpoint)\(description.replacingOccurrences(of: " ", with: "+"))"
        guard let url = URL(string: urlString) else {return}
        let task = URLSession.shared.dataTask(with: url) { (data, response, error) in
            if let _ = error {
                completed(.failure(.invalidData))
                return
            }
            guard let response = response as? HTTPURLResponse, response.statusCode == 200 else {
                completed(.failure(.invalidResponse))
                return
            }
            guard let data = data else {
                completed(.failure(.invalidData))
                return
            }
            do {
                let deconder = JSONDecoder()
                deconder.keyDecodingStrategy = .convertFromSnakeCase
                let result = try deconder.decode(Rooms.self, from: data)
                completed(.success(result.liveRooms))
               
            } catch {
                completed(.failure(.invalidData))
            }
        }
        task.resume()
    }
    
    func enterTheRoom(room: Room, nickname: String, completed: @escaping (Result<String, ErrorMessage>) -> Void) {
        let srtUrl = "\(Constants.endpoint)rooms/\(room.id)"
        print("enterTheRoom URL=\(srtUrl)")
        
        AF.request(srtUrl, method: .post, parameters: ["nickname": nickname], encoding: URLEncoding.httpBody).responseJSON() { response in
            switch response.result {
                case .success:
                    if let data = try! response.result.get() as? [String: Any] {
                        print(data)
                        let pcaUrl = data["url"]
                        completed(.success(pcaUrl as! String))
                    }
                case .failure(let error):
                    print("Error: \(error)")
                    completed(.failure(.invalidData))
            }
        }
    }
}
