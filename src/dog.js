class Dog {
  constructor(id, name,breed,sex) {
    this.id = id
    this.name = name
    this.breed = breed
    this.sex = sex
  }

  toPojo() {
    return {
      name: this.name,
      breed: this.breed,
      sex: this.sex
    }
  }

  render() {
    return `<tr><td>${this.name}</td><td>${this.breed}</td><td>${this.sex}</td> <td><button data-id="${this.id}">Edit</button></td></tr>`
  }
}