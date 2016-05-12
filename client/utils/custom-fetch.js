// Fetch is loaded into window, so just use it globally if it's loaded!
import 'whatwg-fetch'

// fetch default config with cookie
const oldFetch = fetch
fetch = (path, config={}) => {
  let defaultConfig = {
    method: 'get',
    // important for cookie interaction
    credentials: 'same-origin'
  }
  return oldFetch(path, {
    ...defaultConfig,
    ...config
  }).then(handleResponse)
}
fetch.postJSON = (path, data) => {
  let defaultConfig = {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  return oldFetch(path, defaultConfig).then(handleResponse)
}
fetch.postForm = (path, data) => {
  let str = Object.keys(data).map((item) => {
    return `${item}=${encodeURIComponent(data[item])}`
  }).join('&')
  let defaultConfig = {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: str
  }
  return oldFetch(path, defaultConfig).then(handleResponse)
}

function handleResponse(response) {
  if (response.ok) {
    return response.json()
  } else {
    return response.json().then(err => {
      let error = new Error(err.message)
      error.response = response
      throw error
    })
  }
}
export default fetch
