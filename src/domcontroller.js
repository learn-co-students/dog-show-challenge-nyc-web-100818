class DomController {
  constructor() {
    this.tableBody = document.querySelector('#table-body')
    this.editForm = document.querySelector('#dog-form')
    this.inputs = Array.from(this.editForm)
    // events
    this.tableBody.addEventListener('click', this.startEdit.bind(this))
    this.editForm.addEventListener('submit', this.editDog.bind(this))
  }

  appendAllOnPage() {
    const tableBody = document.querySelector('#table-body')
    Dog.renderAll(Dog.all).forEach(function (dogHTML) {
      tableBody.appendChild(dogHTML)
    })
  }

  startEdit(event) {
    if (event.target.innerText === 'edit') {
      const dogId = parseInt(event.target.dataset.editId)
      const editDog = Dog.all.find(dog => dog.id === dogId)
      this.inputs[0].value = editDog.name, this.inputs[1].value = editDog.breed, this.inputs[2].value = editDog.sex, this.inputs[3].dataset.action = editDog.id
    }

  }

  editDog(event) {
    event.preventDefault()
    const dogId = parseInt(this.inputs[3].dataset.action)
    const editDog = Dog.all.find(dog => dog.id === dogId)
    const tableData = Array.from(document.querySelectorAll(`[data-dog="${dogId}"]`))[0]
    tableData.innerHTML = `
    <td>${this.inputs[0].value}</td>
    <td>${this.inputs[1].value}</td>
    <td>${this.inputs[2].value}</td>
    <td><button data-edit-id="${editDog.id}">edit</button></td>
    `
    editDog.name = this.inputs[0].value, editDog.breed = this.inputs[1].value, editDog.sex = this.inputs[2].value
    //could be an adapter method
    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept':  'application/json'
      },
      body: JSON.stringify({
        name: `${this.inputs[0].value}`,
        breed: `${this.inputs[1].value}`,
        sex: `${this.inputs[2].value}`
      })
    })
    .then(r=>r.json())
    .then(p=>console.log(p))

    event.target.reset()
  }

}
