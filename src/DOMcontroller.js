class DOMController {
    constructor() {
        this.dogTable = document.getElementById('table-body')
        this.dogTable.addEventListener('click', this.handle)
    }

    appendAllDogsToPage(dogString) {
        this.dogTable.innerHTML = dogString
    }
}