document.addEventListener('DOMContentLoaded', function() {
console.log('content loaded');

//establish variables for the table of dogs and the edit form for it
const dogTable = document.getElementById('table-body')
const editDogForm = document.getElementById('dog-form')

//establish variables for the input boxes on the edit form
const dogNameInput = document.querySelector('input[type=name]')
const dogBreedInput = document.querySelector('input[type=breed]')
const dogSexInput = document.querySelector('input[type=sex]')


console.log(dogTable);

//Fetching Dogs from the Server
function fetchAllDogs() {
  fetch(`http://localhost:3000/dogs`, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
      console.table(data)
    dogTable.innerHTML = showAllDogs(data)
    const editCollection = document.getElementsByClassName('editButton');
    console.log(editCollection);
    const editBtn = Array.from(editCollection)
    console.log(editBtn);
    editDogFunction(editBtn)
    })

}
fetchAllDogs()

//Showing the Dogs from the Server on the Web Page
function showAllDogs(data) {
  return data.map((eachDog) => {
    return `<tr id=dog-${eachDog.id}>
    <td id="name">${eachDog.name}</td>
    <td id="breed">${eachDog.breed}</td>
    <td id="sex">${eachDog.sex}</td>
    <td><button class='editButton' id=${eachDog.id}>Edit</button></td>
    </tr>`
  }).join("")
}

//Editing the Dogs
function editDogFunction(editBtn) {
  editBtn.forEach(function(button) {
    button.addEventListener('click', (event) => {
      console.log('edit button is being clicked');
      let dogId = event.target.id
      button.id = dogId
      console.log(button.id);
      const buttonParent = button.parentNode.parentNode;
      console.log(buttonParent);
      const dogName = buttonParent.children[0].innerHTML
      const dogBreed = buttonParent.children[1].innerHTML
      const dogSex = buttonParent.children[2].innerHTML
      console.log(dogName);
      console.log(dogBreed);
      console.log(dogSex);
      dogNameInput.value = dogName
      dogBreedInput.value = dogBreed
      dogSexInput.value = dogSex
      dogSubmit(dogId)
    })
  })
}

//Submitting whatever was edited back on to the server
function dogSubmit(dogId) {
  editDogForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let name = e.target.name.value
    let breed = e.target.breed.value
    let sex = e.target.sex.value
    editDogForm.reset()
    fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH',
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(
           {
            "name": name,
            "breed": breed,
            "sex": sex
          }
        )
      })//end of fetch for POST
      .then(response => response.json())
      .then(data => {
        let dogRow = dogTable.querySelector(`tr[id='dog-${dogId}']`)
        let dogName = dogRow.querySelector("#name")
        dogName.innerText = data.name
        let dogBreed = dogRow.querySelector("#breed")
        dogBreed.innerText = data.breed
        let dogSex = dogRow.querySelector("#sex")
        dogSex.innerText = data.sex
      })
  })
}//end of dogSubmit function


showAllDogs()
})//end of DOMContenteditDogFunction
