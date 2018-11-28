
const createDoggos = () => {
  const dogTable = document.getElementById('table-body')
  loadAllDogs()
  .then(data => {
    data.forEach(dog => {
      let newDog = new Dog(dog);
      dogTable.innerHTML += `
      <tr id="${newDog.id}">
        <td>${newDog.name}</td>
        <td>${newDog.breed}</td>
        <td>${newDog.sex}</td>
        <td><button>Edit</button></td>
      </tr>`
    })
  })
}

const editDog = (id, newName, newBreed, newSex) => {
  patchDog(id, newName, newBreed, newSex)
  .then(response => response.json())
  .then(dog => {
    let editing = document.getElementById(dog.id);
    editing.children[0].innerText = newName
    editing.children[1].innerText = newBreed
    editing.children[2].innerText = newSex
  })
}

// const render
