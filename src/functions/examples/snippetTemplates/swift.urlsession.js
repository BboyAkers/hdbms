export default ({ url, auth, body }) => `import Foundation

var semaphore = DispatchSemaphore (value: 0)

let parameters = ${JSON.stringify(body)}
let postData = parameters.data(using: .utf8)

var request = URLRequest(url: URL(string: "${url}")!,timeoutInterval: Double.infinity)
request.addValue("application/json", forHTTPHeaderField: "Content-Type")
request.addValue("Basic ${auth}", forHTTPHeaderField: "Authorization")

request.httpMethod = "POST"
request.httpBody = postData

let task = URLSession.shared.dataTask(with: request) { data, response, error in 
  guard let data = data else {
    print(String(describing: error))
    return
  }
  print(String(data: data, encoding: .utf8)!)
  semaphore.signal()
}

task.resume()
semaphore.wait()`;