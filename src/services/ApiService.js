// TODO: Add vite-plugin-sri for XSS (Cross-Site Scripting)
const apiService = {
  async request(url, method, token, data) {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        //Authorization: token
      },
      //credentials: "include",
      body: method == "GET" ? undefined : JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Response status ${response.status}: ${response.statusText}`);
    }

    return response.json()
  }
}

export default apiService