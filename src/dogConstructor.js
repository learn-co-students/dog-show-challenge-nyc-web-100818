const dogz = [];

class Dog {
  constructor(dog) {
    this.id = dog.id;
    this.name = dog.name;
    this.breed = dog.breed;
    this.sex = dog.sex;
    dogz.push(this)
  }
}
