document.addEventListener('DOMContentLoaded', () => {
    const domController = new DOMController
    const dogAdapter = new JSONAPIAdapter('http://localhost:3000/dogs/')

    dogAdapter.getAll()
        .then(resp => {
            if (resp.ok) {
                return resp.json()
            }
        })
        .then(parsedDogJSON => {
            parsedDogJSON.forEach(dog => new Dog(dog))
            domController.appendAllDogsToPage(Dog.renderAllDogs())
        })
})