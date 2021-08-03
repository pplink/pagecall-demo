import Foundation
import Alamofire

struct Constants {
    static let endpoint = "http://3.38.3.80:8080/"
}

class Service {
    static let shared = Service()
    
    func getResults(description: String, completed: @escaping (Result<Rooms, ErrorMessage>) -> Void) {
        let urlString = "\(Constants.endpoint)\(description.replacingOccurrences(of: " ", with: "+"))"
        print("Service#getResults=\(urlString)")
        
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
                completed(.success(result))
               
            } catch {
                completed(.failure(.invalidData))
            }
        }
        task.resume()
    }
    
    func createRoom(name: String, completed: @escaping (Result<NSDictionary, ErrorMessage>) -> Void) {
        let urlString = "\(Constants.endpoint)rooms"
        print("Service#createRoom=\(urlString)")
        
        AF.request(urlString, method: .post, parameters: ["name": name], encoding: URLEncoding.httpBody).responseJSON() { response in
            switch response.result {
                case .success:
                    if let data = try! response.result.get() as? [String: Any] {
                        print(data)
                        let room = data["room"]
                        completed(.success(room as! NSDictionary))
                    }
                case .failure(let error):
                    print("Error: \(error)")
                    completed(.failure(.invalidData))
            }
        }
    }
    
    func requestRoomUrl(room: Room, nickname: String, completed: @escaping (Result<String, ErrorMessage>) -> Void) {
        let urlString = "\(Constants.endpoint)rooms/\(room.id)"
        print("Service#requestRoomUrl=\(urlString)")
        
        AF.request(urlString, method: .post, parameters: ["nickname": nickname], encoding: URLEncoding.httpBody).responseJSON() { response in
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
    
    func quitRoom(room: Room, completed: @escaping (Result<NSDictionary, ErrorMessage>) -> Void) {
        let urlString = "\(Constants.endpoint)rooms/\(room.id)"
        print("Service#quitRoom=\(urlString)")
        
        AF.request(urlString, method: .put, encoding: URLEncoding.httpBody).responseJSON() { response in
            switch response.result {
                case .success:
                    if let data = try! response.result.get() as? [String: Any] {
                        print(data)
                        let room = data["room"]
                        completed(.success(room as! NSDictionary))
                    }
                case .failure(let error):
                    print("Error: \(error)")
                    completed(.failure(.invalidData))
            }
        }
    }
}
