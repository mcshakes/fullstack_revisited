const URL = "http://localhost:8080";

class BackEndAPI {}

BackEndAPI.fetch = (endpoint, method, data) => {
  let options = {
    method: method,
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }

  return fetch(URL + endpoint, options).then(
    response => {
      if (response.status === 204 && method === "DELETE") {
        return { success: true };
      } else {
        return response.json();
      }
    },
    error => {
      // network level errors
      console.log(error);
    }
  )
};

BackEndAPI.getBooks = () => {
  return BackEndAPI.fetch("/books", "GET")
}

export default BackEndAPI;
