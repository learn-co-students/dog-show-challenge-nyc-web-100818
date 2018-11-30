class Dog {
  constructor(dog) {
    this.name = dog.name
    this.breed = dog.breed
    this.sex = dog.sex
    this.id = dog.id
    Dog.all.push(this)
  }

  static renderAll(array) {
    return array.map(dog => dog.render())
  }

  render() {
    let kennel = document.createElement('tr')
    kennel.innerHTML = `
    <td>${this.name}</td>
    <td>${this.breed}</td>
    <td>${this.sex}</td>
    <td><button data-edit-id="${this.id}">edit</button></td>
    `
    kennel.dataset.dog = `${this.id}`
    return kennel
  }

}

Dog.all = []
