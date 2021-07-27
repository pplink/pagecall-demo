import Foundation

class Service {
    static let shared = Service()
    
    func getResults(description: String, completed: @escaping (Result<[Room], ErrorMessage>) -> Void) {
        let urlString = "http://3.38.3.80:8080/\(description.replacingOccurrences(of: " ", with: "+"))"
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
}
