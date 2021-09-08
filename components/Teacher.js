class Teacher {

    static all = []

    constructor(data){
        this.data = data
        this.events = this.data.events.map(event => new Event(event, this))
        this.constructor.all.push(this)
    }

    renderProfile = () => {
        const {name, title, department, email, image, websiteUrl, biograpy, publications, category} = this.data
        const profile = document.getElementById("profile-list")
        profile.innerHTML += `
            <img src="${image}" alt=${name}/>
            <h3>${name}</h3>
            <h4>Email: ${email}</h4>
            <h4>Website: <a href="${websiteUrl}">${websiteUrl}</a></h4>
            <br><br>
        `
    }

    static renderTeachers(){
        this.all.forEach(teacher => teacher.renderProfile())
    }

    static getTeachers() {
        api.getTeachers().then(teachers => {
            teachers.forEach(teacher => new Teacher(teacher))
            this.renderTeachers()
            this.renderEventsIndex()
        })
    }

    static renderEventsIndex(){
        const eventsDiv = document.querySelector(".events")
        const eventList = document.createElement('div')
        eventList.className = "event"
        eventsDiv.append(eventList)
        console.log(this.events)
        this.events.forEach(e => e.render())
    }
}