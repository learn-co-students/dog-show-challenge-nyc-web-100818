document.addEventListener('DOMContentLoaded', () => {
  // DOM CONTENTS
  let nameInput = document.getElementById('name') // "Baby"
  let breedInput = document.getElementById('breed')
  let sexInput = document.getElementById('sex')
  const dogTableCont = document.getElementById('table-body')
  const editForm = document.getElementById('dog-form')
  // VARIABLES
  const allDogsUrl = 'http://localhost:3000/dogs'
  // FETCHES / EVENT LISTENERS
  // fetch(allDogsUrl, { method: 'GET' }) // get is implied but i like to write it
  //   .then(r => r.json()) // parse the json and get back array of dog objects
  //   .then(arrayOfDogObjects => {
  //     let jsonAsHTML = arrayOfDogObjects.map((dogObj) => {
  //       return  `
  //             <tr><td>${dogObj.name}</td> <td>${dogObj.breed}</td> <td>${dogObj.sex}</td>
  //             <td><button id="${dogObj.id}" data-action="edit"> Edit </button></td>
  //             </tr>
  //               `
  //     }).join('')
  //     dogTableCont.innerHTML = jsonAsHTML
  //   })
    fetchAndShowDogs()

    // make a dog editable
      // click event for the edit button
      // grab id of the dog u click and put it on edit button
      dogTableCont.addEventListener('click', e => {
        // find the edit button now
        if (e.target.dataset.action == 'edit') {
          // prefill the edit form
          let clickedDogId = e.target.id
          editForm.dataset.id = clickedDogId
          console.log(editForm.dataset.id); // ASSIGN THE ID OF THE EDIT FORM TO THE DOG YOU'RE EDITING SO U CAN PATCH TO THAT DOG'S SHOW PAGE - NEED THE DOG'S ID
          // fetch for this dog's show page and use that data to fill the form
          fetch(`http://localhost:3000/dogs/${clickedDogId}`)
            .then(r => r.json())
            .then(clickedDogObj => {
              // pre fill the edit form w this object's data
              // found those input fields above ^
              // set the value of those fields
              // document.getElementById('name').value = clickedDogObj.name
              // nameInput = ""
              // nameInput = "Baby"
              nameInput.value = clickedDogObj.name
              breedInput.value = clickedDogObj.breed
              sexInput.value = clickedDogObj.sex
            })
        }
      }) // end of click event

      // event listener for SUBMIT on the edit form --> PATCH to server
      editForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let clickedDogId = e.target.dataset.id
        let nameInput = document.getElementById('name').value // "Baby"
        let breedInput = document.getElementById('breed').value
        let sexInput = document.getElementById('sex').value
        // now make a fetch to PATCH with updates/edits  --> patch to specific dog
        fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`, {
          method: "PATCH",
          headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
          },
          body: JSON.stringify({
            "name": nameInput,
            "breed": breedInput,
            "sex": sexInput
          })
        })
        .then(r => r.json())
        .then(updatedDoggo => {
          fetchAndShowDogs()
        })
      }) // end of submit event

      //******************* HELPER *********************
      function fetchAndShowDogs() {

        fetch(allDogsUrl, { method: 'GET' }) // get is implied but i like to write it
          .then(r => r.json()) // parse the json and get back array of dog objects
          .then(arrayOfDogObjects => {
            let jsonAsHTML = arrayOfDogObjects.map((dogObj) => {
              return  `
                    <tr><td>${dogObj.name}</td> <td>${dogObj.breed}</td> <td>${dogObj.sex}</td>
                    <td><button id="${dogObj.id}" data-action="edit"> Edit </button></td>
                    </tr>
                      `
            }).join('')
            dogTableCont.innerHTML = jsonAsHTML
        })
      }

}) // end of DOMContentLoaded
