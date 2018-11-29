

document.addEventListener('DOMContentLoaded', () => {
const tableBody = document.getElementById("table-body")
const form = document.getElementById("dog-form")
let currentDogId;

  function getDogs(){
    fetch("http://localhost:3000/dogs", {method: "GET"})
    .then(response => response.json())
    .then( data =>{
      putDogsOnPage(data)
    })
  }// end getDogs

  function putDogsOnPage(dogs){
    tableBody.innerHTML = ""
    dogs.forEach(function(dog){
      tableBody.innerHTML +=
      `<tr><td>${dog.name}</td> <td>${dog.breed}</td><td>${dog.sex}</td><td><button data-id="${dog.id}">Edit</button></td></tr>`
    })
  }

  function whatsHappening(){
    tableBody.addEventListener("click", function(event){
      if (event.target.type === "submit"){
        let name = event.target.parentNode.parentNode.children[0]
        let breed = event.target.parentNode.parentNode.children[1]
        let sex = event.target.parentNode.parentNode.children[2]
        form.name.value = name.innerText
        form.breed.value = breed.innerText
        form.sex.value = sex.innerText
        currentDogId = event.target.dataset.id
      }
    })
  }

  function updateDog(callback){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      fetch(`http://localhost:3000/dogs/${currentDogId}`, {
        method: "PATCH",
        headers: {
          "Content-Type":  "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.name.value,
          breed: form.breed.value,
          sex: form.sex.value
        })
      }).then(response => response.json())
      .then(data => {
        callback()
      })

    })
  }


  getDogs()
  whatsHappening()
  updateDog(getDogs)
})
