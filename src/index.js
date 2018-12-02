////edit//

document.addEventListener('DOMContentLoaded', () => {
  let nameInput = document.getElementById('name')
  let breedInput = document.getElementById('breed')
  let sexInput = document.getElementById('sex')
  const dogTableCont = document.getElementById('table-body')
  const editForm = document.getElementById('dog-form')
  const allDogsUrl = 'http://localhost:3000/dogs'

/////////////////////////////////fetch/////////////////////////////////////////////////////////////////////////////////
    function fetchAndShowDogs() {

      fetch(allDogsUrl, { method: 'GET' })
        .then(r => r.json())
        .then(r => {
          let jsonAsHTML = r.map((dogObj) => {
            return  `
                  <tr><td>${dogObj.name}</td> <td>${dogObj.breed}</td> <td>${dogObj.sex}</td>
                  <td><button id="${dogObj.id}" data-action="edit"> Edit </button></td>
                  </tr>
                    `
          }).join('')
          dogTableCont.innerHTML = jsonAsHTML
      })
    }

  fetchAndShowDogs()
////////////////////////////////////////////////////////edit prefill fields/////////////////////////////////////////////////////
      dogTableCont.addEventListener('click', e => {

        if (e.target.dataset.action == 'edit') {
          let clickedDogId = e.target.id
          editForm.dataset.id = clickedDogId

          fetch(`http://localhost:3000/dogs/${clickedDogId}`)
            .then(r => r.json())
            .then(clickedDogObj => {

              nameInput.value = clickedDogObj.name
              breedInput.value = clickedDogObj.breed
              sexInput.value = clickedDogObj.sex
            })
        }
      }) // end of click event
//////////////////////////////////////////////////////////////////edit persist to DB//////////////////////////////////////////
      editForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let clickedDogId = e.target.dataset.id
        debugger
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
}) // end of DOMContentLoaded
