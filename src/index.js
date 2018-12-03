document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Loaded!');

  const dogTableBody = document.querySelector('#table-body')
  const dogForm = document.querySelector("#dog-form")
  const dogNameInput = document.querySelector("#name-input");
  const dogBreedInput = document.querySelector("#breed-input");
  const dogSexInput = document.querySelector("#sex-input");
  let allDogs = [];

  showDogData = () => {
    fetch(`http://localhost:3000/dogs`, { method: 'GET' })
      .then(response => response.json())
      .then(json => {
        allDogs = json;
        json.forEach(function(dog) {
          dogTableBody.innerHTML +=
          `<tr>
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button id=${dog.id}>Edit</button></td>
          </tr>`
        }) // json.forEach(function(dog) ---> ENDS HERE
      }) // then(json => ---> ENDS HERE
  } // showDogData = () ---> ENDS HERE
  showDogData()

  dogTableBody.addEventListener("click", event => {
    // event.target is the button
    clickedDogIdx = parseInt(event.target.id);
    targetDog = allDogs.find(dog => dog.id === clickedDogIdx);
    console.table(targetDog);
    // passing the targetDog's attributes to the edit form
    dogNameInput.value = targetDog.name;
    dogBreedInput.value = targetDog.breed;
    dogSexInput.value = targetDog.sex;
    dogForm.id = targetDog.id;

  });

  dogForm.addEventListener("submit", event => {
    event.preventDefault();
    editedDogIdx = parseInt(event.target.id);
    // Fetch => PATCH
    fetch(`http://localhost:3000/dogs/${editedDogIdx}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: dogNameInput.value,
        breed: dogBreedInput.value,
        sex: dogSexInput.value
      })
    })
      .then(r => r.json())
      .then(data => {
        showDogData();
      });
    event.target.reset();
  });



}) // document.addEventListener('DOMContentLoaded' ---> ENDS HERE
