class Teacher {

    static all = []

    constructor(data){
        this.data = data
        // this.events = this.data.events.map(event => new Event(event, this))
        this.constructor.all.push(this)
    }

    renderProfile = () => {
        const {id, name, title, department, email, image, websiteUrl, biograpy, publications, category, city, state, country} = this.data
        document.getElementById("profile-list").innerHTML += `
            <br><br><img src="${image}" alt=${name}/>
            <h3 id="teacher-name" data-id=${id} data-action="name"><span style="font-size: 1.2vw">${name}</span></h3>
            <h4>Email: ${email}</h4>
            <h4>Website: <a href="${websiteUrl}">${websiteUrl}</a></h4>
            <br><br><br><br><br><br>
        `
        const teacherId = document.querySelectorAll('#teacher-name')
        // teacherId.forEach(id => id.addEventListener('click', this.teacherEvents))

        //fix this later! Filtered by pinned location
        const location = document.getElementById("location")
        location.innerHTML = `<h3><strong>Location: ${city}, ${state}</strong></h3>`
    }

    //########################Filter teacher's events################################
    teacherEvents = (e) => {
        e.preventDefault()
        const id = e.target.dataset.id
        const teacherAction = e.target.dataset.action
        const eventsDiv = document.getElementById('eventList')
        if (teacherAction === 'name'){
            const t = Teacher.all.find(t => t.data.id == id)
            const e = Event.getEvents()
            if (eventsDiv){
                eventsDiv.innerHTML = ""
            }
            t.getEvents()
        }
    }
    getEvents = () => {
        this.events.map(event => event.renderEvent())
    }


    //#################MODAL FORM#####################################
    static renderTeacherButton = () => {
        const formDiv = document.querySelector('.buttons')
        const addBtn = document.createElement('button')
        addBtn.id = 'add-teacher-btn'
        addBtn.innerText = "Add a Teacher"
        addBtn.addEventListener("click", this.openTeacherForm)
        formDiv.appendChild(addBtn)
    }
    static openTeacherForm = (e) => {
        modal.open()
        modal.main.innerHTML = ''
        modal.main.innerHTML += `
            <h1 style="text-align: center">Join the Community</h1>
            <form class="event-form">
                <input type="text" name="name" placeholder="Name">
                <input type="text" name="title" placeholder="Title">
                <input type="text" name="department" placeholder="Department">
                <input type="email" name="email" placeholder="Email"><br><br>
                <label for="picture">Profile Picture:</label>
                <input type="text" name="profilePic" placeholder="URL">
                <label for="url">Enter a link for your website:</label>
                <input type="text" name="url" placeholder="https://example.com">
               

                <select name="category">
                    <option value="faculty">Faculty</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                </select><br><br>

                <label for="biography">Biography:</label>
                <textarea rows="5" cols="74" name="biography" form="usrform">Enter text here...</textarea><br><br>
            
                <input type="text" name="city" value="" placeholder="City">
                <input type="text" name="state" value="" placeholder="State">
                <input type="text" name="country" value="" placeholder="Country"><br><br>
                <button type="submit" class="submit-event">Submit Event</button>
            </form>`   

        modal.main.getElementsByClassName("event-form")[0].addEventListener("submit", this.handleSubmit) //??? why does this work for a local function?
    }
    static handleSubmit = (e) => {
        e.preventDefault()
        const newTeacher = {
            name: e.target.name.value,
            title: e.target.title.value,
            department: e.target.department.value,
            email: e.target.email.value,
            website_url: e.target.url.value,
            image: e.target.profilePic.value,
            category: e.target.category.value,
            city: e.target.city.value,
            state: e.target.state.value,
            country: e.target.country.value,
            //biography?
        }
        api.createTeacher(newTeacher).then(teacher => {
            debugger
            new Teacher(teacher).renderProfile()
        })
        modal.close()
        e.target.reset()
    }

    //######################Render Events################################
    static renderTeachers = () => {
        this.all.forEach(teacher => teacher.renderProfile())
    }
    static getTeachers() {
        api.getTeachers().then(teachers => {
            teachers.forEach(teacher => new Teacher(teacher))
            this.renderTeachers()
        })
    }


}