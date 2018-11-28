const loadAllDogs = () => {
  return fetch('http://localhost:3000/dogs')
  .then(response => response.json())
}

const patchDog = (id, name, breed, sex) => {
  return fetch(`http://localhost:3000/dogs/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      breed: breed,
      sex: sex
    })
  })
}
