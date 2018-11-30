class Dog {
    constructor(dogData) {
        this.name = dogData.name
        this.breed = dogData.breed
        this.sex = dogData.sex

        Dog.all.push(this)
    }

    static renderAllDogs() {
        return Dog.all.map(d => d.render()).join('')
    }

    render() {
        return `<tr>
                    <td>${this.name}</td> 
                    <td>${this.breed}</td> 
                    <td>${this.sex}</td> 
                    <td><button>Edit</button></td>
                </tr>`
    }
} //end of Dog class

Dog.all = []