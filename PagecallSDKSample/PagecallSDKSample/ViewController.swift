import UIKit

class ViewController: UIViewController {
    @IBOutlet weak var urlField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let viewController = segue.destination as? MeetingViewController {
            if let urlString = urlField.text, let url = URL(string: urlString) {
                viewController.url = url;
            } else {
                viewController.url = nil;
            }
        }
    }
}

