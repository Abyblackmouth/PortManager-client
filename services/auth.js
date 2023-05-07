import {URL_BASE_API} from "./config"

function login(user, password) {
    const URL = `${URL_BASE_API}/login`
    const options =  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({ user, password }),
      }
    return fetch(URL, options) // regresa una promesa
}

export {
    login
}