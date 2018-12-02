class DogsController {
  constructor() {
    this.api = new Adapter();
    this.dogFactory = new DogFactory();
  }

  loadView() {
    return this.api.getDogs()
      .then(dogs => {
        let tableContent = '';
        dogs.forEach(dog => {
          let newDog = this.dogFactory.findOrCreateDog(dog.id, dog.name, dog.breed, dog.sex);
          tableContent += newDog.render();
        })
        return tableContent;
      })
  }

  addDog(dogArgs) {
    return this.api.postDog(dogArgs)
      .then(dog => console.log(dog))
  }

  editDog(dogID, dogArgs) {
    console.log('here', dogID, dogArgs);
    return this.api.patchDog(dogID, dogArgs)
      .then(console.log)
  }

  findDog(id) {
    return this.dogFactory.getDogByID(id)
  }
}