class Teacher {

    static all = []

    constructor(data){
        this.data = data
        this.events = this.data.events.map(event => new Event(event, this))
        this.constructor.all.push(this)
    }

    renderProfile = () => {
        const {id, name, title, department, email, image, websiteUrl, biograpy, publications, category, city, state, country} = this.data
        const profile = document.getElementById("profile-list")
        profile.innerHTML += `
            <img src="${image}" alt=${name}/>
            <h3 id="teacher-name" data-id=${id} data-action="name">${name}</h3>
            <h4>Email: ${email}</h4>
            <h4>Website: <a href="${websiteUrl}">${websiteUrl}</a></h4>
            <br><br>
        `
        const teacherId = document.querySelectorAll('#teacher-name')
        teacherId.forEach(id => id.addEventListener('click', this.teacherEvents))

        //fix this later! Filtered by pinned location
        const location = document.getElementById("location")
        location.innerHTML = `<h3><strong>Location: ${city}, ${state}</strong></h3>`
        
    }

    teacherEvents = (e) => {
        e.preventDefault()
        const id = e.target.dataset.id
        const teacherAction = e.target.dataset.action
        const eventsDiv = document.getElementById('eventList')
        if (teacherAction === 'name'){
            // this.find(teacherId).getEvents()
            const t = Teacher.all.find(t => t.data.id == id)
            if (eventsDiv){
                eventsDiv.innerHTML = ""
            }
            t.getEvents()
        }
    }

    getEvents = () => {
        this.events.forEach(event => event.renderEvent())
    }


    //all class functions are down here
    static renderTeachers(){
        this.all.forEach(teacher => teacher.renderProfile())
    }

    static getTeachers() {
        api.getTeachers().then(teachers => {
            teachers.forEach(teacher => new Teacher(teacher))
            this.renderTeachers()
            
        })
    }


}