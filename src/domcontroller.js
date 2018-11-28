
document.addEventListener('DOMContentLoaded', () => {

  const mainFlex = document.querySelector('.main');

  mainFlex.innerHTML += `<div id="dog-table" ></div>`

  createDoggos()

  const tableBody = document.getElementById('table-body');
  const dogForm = document.getElementById('dog-form');

  dogForm.addEventListener('submit', (event) => {
    // debugger
    event.preventDefault()
    const dogForm = document.getElementById('dog-form');
    let dogId = 1
    let newName = dogForm.children[0].value;
    let newBreed = dogForm.children[1].value;
    let newSex = dogForm.children[2].value;
    editDog(event.target.dataset.id, newName, newBreed, newSex)

  })




  tableBody.addEventListener('click', (event) => {
    if (event.target.type == "submit") {
      const selectedElementId = event.target.parentElement.parentElement.id;
      const dogForm = document.getElementById('dog-form');
      let thisDoggo = dogz.find(dog => dog.id == selectedElementId);
      dogForm.dataset.id = selectedElementId
      dogForm.children[0].setAttribute('value', thisDoggo.name)
      dogForm.children[1].setAttribute('value', thisDoggo.breed)
      dogForm.children[2].setAttribute('value', thisDoggo.sex)
      // debugger
    }
  })

})
