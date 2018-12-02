class DogFactory {
  constructor() {
    this._dogs = []
  }

  findOrCreateDog(id, name, breed, sex) {
    let dog = this.getDogByName(name);

    if(dog) {
      return dog
    }
    else {
      const newDog = new Dog(id, name, breed, sex);
      this._dogs.push(newDog);
      return newDog;
    }
  }

  getDogByName(name) {
    return this._dogs.find(dog => dog.name === name);
  }

  getDogByID(id) {
    return this._dogs.find(dog => dog.id  == id);
  }
}