let editID = 0
let inputName = null
let inputBreed = null
let inputSex = null
let tableBody = null

document.addEventListener('DOMContentLoaded', () => {
  inputName = document.querySelector('input[type=name]')
  inputBreed = document.querySelector('input[type=breed]')
  inputSex = document.querySelector('input[type=sex]')
  tableBody = document.getElementById('table-body')
  loadDoggos()
  bindSubmitDoggo()

})

function loadDoggos() {
  tableBody.innerHTML = ''
  fetch(`http://localhost:3000/dogs`)
  .then(res => res.json())
  .then(parsedRes => {
    parsedRes.forEach((doggo) => {
      tableBody.innerHTML += loadDoggoHTML(doggo)
    })
  })
  .then(res => bindEditButtons())
}

function loadDoggoHTML(doggo) {
  return `<tr><td>${doggo.name}</td> <td>${doggo.breed}</td> <td>${doggo.sex}</td> <td><button class='edit' id='doggo${doggo.id}'>Edit</button></td></tr>`
}

function bindEditButtons() {
  Array.from(document.getElementsByClassName('edit')).forEach((button) => {
    button.addEventListener('click', (event) => {
      editID = parseInt(event.target.id.split('doggo')[1])
      const row = event.target.parentNode.parentNode
      inputName.value = row.children[0].innerText
      inputBreed.value = row.children[1].innerText
      inputSex.value = row.children[2].innerText
    })
  })
}

function bindSubmitDoggo() {
  submit = document.getElementById('dog-form')
  submit.addEventListener('submit', () => {
    if (editID > 0) {submitDoggo(event)}
  })
}

function submitDoggo(event) {
  event.preventDefault()
  const doggoInfo = {name: inputName.value, breed: inputBreed.value, sex: inputSex.value}
  fetch(`http://localhost:3000/dogs/${editID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(doggoInfo)
  })
  .then(res => res.json())
  .then(parsedRes => console.log(parsedRes))
  .then(res => loadDoggos())
}
