document.addEventListener('DOMContentLoaded', init)
function init () {
  domCon = new DomController
  fetch('http://localhost:3000/dogs')
  .then( r => r.json())
  .then(function (parsedResponse) {
    parsedResponse.forEach(dog => {
      let newDog = new Dog(dog)
    })
    Dog.renderAll(Dog.all)
    domCon.appendAllOnPage()
  })
}
