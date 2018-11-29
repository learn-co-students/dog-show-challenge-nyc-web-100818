document.addEventListener('DOMContentLoaded', () => {
  const controller = new DogsController();
  const form = document.querySelector('#dog-form')
  const inputName = document.querySelector('input[type=name]')
  const inputBreed = document.querySelector('input[type=breed]')
  const inputSex = document.querySelector('input[type=sex]')
  const tableBody = document.getElementById('table-body')

  const renderApp = () => {
    controller.loadView()
    .then(content => {
      tableBody.innerHTML = content
    });
  }


  // form.addEventListener('submit', function(event) {
  //   event.preventDefault();
  //   // console.log(event);
  //   // let newdog = {
  //   //   name: inputName.value,
  //   //   breed: inputBreed.value,
  //   //   sex: inputSex.value
  //   // }

  //   // controller.addDog(newdog)
  //   //   .then(() => renderApp())

  //   // controller.editDog(dogId, editDog)
  // })

  tableBody.addEventListener('click', function(event) {
    if(event.target.nodeName == "BUTTON") {
      let dogId = event.target.dataset.id;
      let dog = controller.findDog(dogId);

      inputName.value =   dog.name
      inputBreed.value = dog.breed
      inputSex.value = dog.sex
    }
  })

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    editDog = {
      name: inputName.value,
      breed: inputBreed.value,
      sex: inputSex.value
    }

    console.log(editDog, dogId);
    debugger
    controller.editDog(dogId, editDog)
  })
  

  renderApp();
})
