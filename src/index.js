document.addEventListener('DOMContentLoaded', () => {
  const dogContainer = document.querySelector('#table-body')
  const nameInput = document.querySelector('#name')
  const breedInput = document.querySelector('#breed')
  const sexInput = document.querySelector('#sex')
  const editForm = document.querySelector('#dog-form')

  //---------------fetch and Show---------//

  function fetchAllDogs(){
    fetch("http://localhost:3000/dogs")
      .then(r => r.json())
      .then(dogArray => {
        dogArray.forEach((dog)=> {
          dogContainer.innerHTML += renderSingleDog(dog)
        })//end of foreach
      })//end of then
  }//end of fetch function
  fetchAllDogs()//call function


  //--------------Eventlisteners---------//

  //-------------click & Get----------//
  dogContainer.addEventListener('click', e => {
    if(e.target.dataset.action === 'edit'){
      const dogRow = e.target.parentElement.parentElement
      const id = dogRow.id.split('-')[1]
    fetch(`http://localhost:3000/dogs/${id}`)
      .then(r => r.json())
      .then(clickedDog =>{ //fetched dog.id
        nameInput.value = clickedDog.name
        breedInput.value = clickedDog.breed
        sexInput.value = clickedDog.sex
        editForm.id = clickedDog.id
      })//end of then
    }//end of if edit
  })//end of click Eventlistener

  //--------------submit & Patch-----------//
  editForm.addEventListener('submit', e => {
    e.preventDefault()
      const id = e.target.id
      const nameInput = e.target.querySelector('#name').value
      const breedInput = e.target.querySelector('#breed').value
      const sexInput = e.target.querySelector('#sex').value
    //update DOM
    fetch(`http://localhost:3000/dogs/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },//end of headers
      body: JSON.stringify({
        name: nameInput,
        breed: breedInput,
        sex: sexInput
      })//end of body
    })//end of patch fetch
      .then(r => r.json())
      .then(updatedDog => {
        console.log(nameInput)
        const dogRow = document.querySelector(`tr[id='dog-${updatedDog.id}']`)
        console.log(dogRow)
        dogRow.querySelector('#name').innerText = nameInput
        dogRow.querySelector('#breed').innerText = breedInput
        dogRow.querySelector('#sex').innerText = sexInput
      })
    e.target.reset()
  })//end of submit patch

})//end of DOM


function renderSingleDog(dog) {
  return `
    <tr id = "dog-${dog.id}">
      <td class='padding center' id="name">${dog.name}</td>
      <td class='padding center' id="breed">${dog.breed}</td>
      <td class='padding center' id="sex">${dog.sex}</td>
      <td class='padding center'><button id="${dog.id}" data-action="edit"> Edit </button></td>
    </tr>
  `
}
