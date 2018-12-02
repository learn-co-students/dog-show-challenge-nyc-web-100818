document.addEventListener("DOMContentLoaded", () => {
  // **DOM ELEMENTS**
  const dogTable = document.querySelector("#table-body");
  const dogForm = document.querySelector("#dog-form");
  const dogNameInput = document.querySelector("#name-input");
  const dogBreedInput = document.querySelector("#breed-input");
  const dogSexInput = document.querySelector("#sex-input");
  let allDogs = [];

  // **FUNCTIONS**
  function fetchDogs() {
    fetch("http://localhost:3000/dogs")
      .then(r => r.json())
      .then(dogData => {
        console.table(dogData);
        allDogs = dogData;
        dogTable.innerHTML = renderAllDogs(dogData);
      });
  }
  fetchDogs();

  // Make a dog editable.Clicking on the edit button next to a dog should populate the top form with that dog's current information

  dogTable.addEventListener("click", event => {
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
        fetchDogs();
      });
    event.target.reset();
  });
});

// **HELPER FUNCTIONS**
function renderAllDogs(dogArray) {
  return dogArray
    .map(function(dog) {
      return `
          <tr>
          <td>${dog.name}</td>
          <td>${dog.breed}</td>
          <td>${dog.sex}</td>
          <td><button id=${dog.id}>Edit</button></td>
          </tr>
                `;
    })
    .join("");
}
