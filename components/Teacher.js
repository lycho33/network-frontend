class Teacher {

    static all = []

    constructor(data){
        this.data = data
        this.constructor.all.push(this)
        console.log(this)
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
        })
    }
}