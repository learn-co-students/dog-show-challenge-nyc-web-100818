class DogApi {
  constructor() {
    this.baseUri = 'http://localhost:3000'
  }

  getDog(id) {
    const endpoint = `/dogs/${id}`
    const options = {
      method: 'GET'
    }
    return this._fetchJson(endpoint, options)
  }

  getDogs() {
    const endpoint = `/dogs/`
    const options = {
      method: 'GET'
    }
    return this._fetchJson(endpoint, options)
  }

  postDog(dogObject) {
    const endpoint = `/dogs/`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dogObject)
    }
    return this._fetchJson(endpoint, options)
  }

  patchDog(id, dogObject) {
    const endpoint = `/dogs/${id}`
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dogObject)
    }
    return this._fetchJson(endpoint, options)
  }

  deleteDog(id) {
    const endpoint = `/dogs/${id}`
    const options = {
      method: 'DELETE'
    }
    return this._fetchJson(endpoint, options)
  }

  _fetchJson(endpoint, options) {
    return fetch(`${this.baseUri}${endpoint}`, options)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
  }
}