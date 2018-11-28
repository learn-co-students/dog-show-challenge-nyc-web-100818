
document.addEventListener('DOMContentLoaded', () => {
  const controller = new DogController()
  const tableBody = document.getElementById('table-body')
  const dogForm = document.getElementById('dog-form')

  // get the dogs when the page loads
  controller.loadDogsFromApi()
    .then(() => {
      renderApp()
    })

  // edit dog event
  tableBody.addEventListener('click', e => {
    if (e.target.nodeName === "BUTTON") {
      // find the dog
      const dogId = e.target.dataset.id
      const dog = controller.findDogById(dogId)
      // copy to form
      dogForm.dataset.id = dogId
      dogForm.querySelector('input[name="name"]').value = dog.name
      dogForm.querySelector('input[name="breed"]').value = dog.breed
      dogForm.querySelector('input[name="sex"]').value = dog.sex
    }
  })

  dogForm.addEventListener('submit', e => {
    e.preventDefault()
    const dogId = e.target.dataset.id
    const dog = controller.findDogById(dogId)
    // update our local doggo
    dog.name = e.target.querySelector('input[name="name"]').value
    dog.breed = e.target.querySelector('input[name="breed"]').value
    dog.sex = e.target.querySelector('input[name="sex"]').value
    // optimistic rendering + reset the form
    renderApp()
    e.target.dataset.id = 0
    e.target.reset()
    // then update the API
    dogObj = dog.toPojo()
    controller.updateDog(dogId, dogObj)
      .catch(console.error)
  })

  const renderApp = () => {
    tableBody.innerHTML = controller.render()
  }

})