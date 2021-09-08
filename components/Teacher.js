class Teacher {

    static all = []

    constructor(data){
        this.data = data
        this.events = this.data.events.map(event => new Event(event))
        this.constructor.all.push(this)
    }

    renderProfile = () => {
        const {name, title, department, email, image, websiteUrl, biograpy, publications, category, city, state, country} = this.data
        const profile = document.getElementById("profile-list")
        profile.innerHTML += `
            <img src="${image}" alt=${name}/>
            <h3>${name}</h3>
            <h4>Email: ${email}</h4>
            <h4>Website: <a href="${websiteUrl}">${websiteUrl}</a></h4>
            <br><br>
        `
        //fix this later! Filtered by pinned location
        const location = document.getElementById("location")
        location.innerHTML = `<p><strong>Location: ${city}, ${state}</strong></p>`
     
    }

    //all class functions are down here
    static renderTeachers(){
        this.all.forEach(teacher => teacher.renderProfile())
    }

    formDisplay = () => {
        console.log("this works")
    }

    static getTeachers() {
        api.getTeachers().then(teachers => {
            teachers.forEach(teacher => new Teacher(teacher))
            this.renderTeachers()
            
        })
    }


}