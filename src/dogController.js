class DogController {
  constructor() {
    this.dogs = []
    this.api = new DogApi()
  }

  loadDogsFromApi() {
    return this.api.getDogs()
      .then(dogJson => {
        dogJson.forEach(dogObj => {
          this.addDogFromJson(dogObj)
        })
      })
      .catch(console.error)
  }

  addDogFromJson(dogObj) {
    const dog = new Dog(dogObj.id, dogObj.name, dogObj.breed, dogObj.sex)
    this.dogs.push(dog)
  }

  updateDog(dogId, dogObj) {
    return this.api.patchDog(dogId, dogObj)
  }
  
  findDogById(id) {
    return this.dogs.find(dog => dog.id == id)
  }
  
  render() {
    return this.dogs.map(dog => dog.render()).join("")
  }
}