class JSONAPIAdapter {
    constructor(endpoint) {
        this.endpoint = endpoint
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    getAll() {
        return fetch(this.endpoint)
    }

    getSingleItem(id) {
        return fetch(`${this.endpoint}/${id}`)
    }
}