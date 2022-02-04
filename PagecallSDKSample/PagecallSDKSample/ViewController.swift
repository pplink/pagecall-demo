import UIKit

class ViewController: UIViewController {
    @IBOutlet weak var urlField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        if let urlString = UserDefaults.standard.string(forKey: "URL") {
            urlField.text = urlString;
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let viewController = segue.destination as? MeetingViewController {
            if let urlString = urlField.text, let url = URL(string: urlString) {
                UserDefaults.standard.set(urlString, forKey: "URL");
                viewController.url = url;
            } else {
                viewController.url = nil;
            }
        }
    }
}

