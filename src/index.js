document.addEventListener('DOMContentLoaded', () => {
const dogTable = document.querySelector('#table-body')
const dogEditName = document.querySelector('#dog-form-name')
const dogEditBreed = document.querySelector('#dog-form-breed')
const dogEditSex = document.querySelector('#dog-form-sex')
const dogEditForm = document.querySelector('#dog-form')
// console.log(dogEditForm)
let allDogs = []

///render all dogs on page
function fetchAllDogs(){
  fetch(`http://localhost:3000/dogs`, {method: 'GET'})
  .then(res =>
    {
      if (res.ok){
        return res.json()}
      })
      .then(data => {
        allDogs = data;
        renderAllDogs(data)})
}
fetchAllDogs()

/// EDIT DOGS
dogTable.addEventListener('click', (e) => {
  clickedDogIndex = parseInt(e.target.id)
  selectedDog = allDogs.find((dog) => dog.id === clickedDogIndex)
  // console.log(selectedDog);
  //render on edit form
  dogEditName.value = selectedDog.name
  dogEditBreed.value = selectedDog.breed
  dogEditSex.value = selectedDog.sex
  dogEditForm.id = selectedDog.id
})


/// Listen to submit on edit form /// PESSIMISTICALLY
dogEditForm.addEventListener('submit', (e) =>{
  e.preventDefault()
  editDogID = parseInt(e.target.id)
  fetch(`http://localhost:3000/dogs/${editDogID}`, {
    method: 'PATCH',
    headers:
      {"Content-Type": "application/json",
        "Accept": "application/json"},
    body: JSON.stringify({
      name: dogEditName.value,
      breed: dogEditBreed.value,
      sex: dogEditSex.value
    })
  })// end of fetch patch
  .then(res => res.json())
  .then(data => {
    fetchAllDogs()})
    e.target.reset()
}) // end eventlistener for dog edit



//// HELPER METHODS:
function renderAllDogs(dogCollection) {
  dogTable.innerHTML =
    dogCollection.map(each => {
      return `<tr><td>${each.name}</td> <td>${each.breed}</td> <td>${each.sex}</td> <td><button id=${each.id}>Edit</button></td></tr>`
  }).join('')
}

})
