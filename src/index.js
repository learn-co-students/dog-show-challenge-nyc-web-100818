document.addEventListener('DOMContentLoaded', () => {

  //reference to dog table body
  let registeredDogTableBody = document.getElementById('table-body');

  let allDogs = []
  //referenc to edit form
  const editForm = document.querySelector('#dog-form');


  //GET dog data
  fetch('http://localhost:3000/dogs')
  .then(response => response.json())
  .then(dogDataJSON => {
    console.log(dogDataJSON);
    //render all Dogs on page by passig in Dog Data and the reference to the dog table body
    allDogs = dogDataJSON;
    renderAllDogs(dogDataJSON, registeredDogTableBody)
  })


  //fill in edit existing form content with current dog info from table upon clicking edit button for dog instance
  registeredDogTableBody.addEventListener('click', function(e){
    if (e.target.className == 'edit-btn'){
      let clickedDogId = e.target.id;
      editForm.dataset.id = clickedDogId;

      fetch(`http://localhost:3000/dogs/${clickedDogId}`)
        .then(r => r.json())
        .then(dogInstanceDataJSON => {
          console.log(dogInstanceDataJSON);
          editForm.name.value = dogInstanceDataJSON.name
          editForm.breed.value = dogInstanceDataJSON.breed
          editForm.sex.value = dogInstanceDataJSON.sex
        })


  //when click submit, update table body
  editForm.addEventListener('submit', function(e){
    e.preventDefault();

      // debugger
    fetch(`http://localhost:3000/dogs/${clickedDogId}`, { method: 'PATCH',
    headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

    body: JSON.stringify
      ({
        "name": `${e.target.name.value}`,
        "breed": `${e.target.breed.value}`,
        "sex": `${e.target.sex.value}`
      })
    })
    .then(r => r.json())
    .then(updatedDog => {
      // fetch('http://localhost:3000/dogs')
      // .then(response => response.json())
      // .then(dogDataJSON => {
        // console.log(allDogs);
        // console.log(updatedDog);
        // debugger
        allDogs = allDogs.map(dog=> {
        if(dog.id === updatedDog.id) {
            return updatedDog
        } else {
            return dog
        }
    })
        //render all Dogs on page by passig in Dog Data and the reference to the dog table body
        renderAllDogs(allDogs, registeredDogTableBody)
          // let clickedDogId = e.target.dataset.id;
          // const targetDogDiv = document.getElementById(`dog-${clickedDogId}`) //find the div that needs to be updated with the new data
          // targetDogDiv.querySelector('.dog-name').innerText = dogDataJSON[clickedDogId-1].name
          //   targetDogDiv.querySelector('.dog-breed').innerText = dogDataJSON[clickedDogId-1].breed
          //   targetDogDiv.querySelector('.dog-sex').innerText = dogDataJSON[clickedDogId-1].sex
          //debugger
        //debugger
      })

    })

  // })

    }
    // debugger
  })


})//end of DOM CONTENT LOADED function


//************************
//****HELPER FUNCTIONS****
//************************

//render single dog
function renderSingleDog(dogObject){
  return `
    <tr id="dog-${dogObject.id}">
      <td class="dog-name">${dogObject.name}</td>
      <td class="dog-breed">${dogObject.breed}</td>
      <td class="dog-sex">${dogObject.sex}</td>
      <td><button class="edit-btn" id="${dogObject.id}">Edit</button></td>
    </tr>
  `
}

//render all dogs
function renderAllDogs(dogsArr, dogsTable){
  dogsTable.innerHTML = ''
  return dogsArr.map((dog) => {
    dogsTable.innerHTML += renderSingleDog(dog)
  });

}
