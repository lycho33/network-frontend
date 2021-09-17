class ApiService {

    constructor(api){
        this.api = api
    }

    getTeachers = () => fetch(this.api + "/teachers").then(r => r.json())   
    getEvents = () => fetch(this.api + "/teachers/1/events").then(r => r.json())

 
    createTeacher = (newTeacher) => {
        return fetch (`${this.api}/teachers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: newTeacher.id,
                name: newTeacher.name,
                title: newTeacher.title,
                department: newTeacher.department,
                email: newTeacher.email,
                image: newTeacher.image,
                website_url: newTeacher.website_url,
                category: newTeacher.category,
                city: newTeacher.city,
                state: newTeacher.state,
                country: newTeacher.country,
            }),
        })
        .then(r => r.json())
    }

    createEvent = (newEvent) => {
        return fetch (`${this.api}/teachers/${newEvent.teacher_id}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent),
        })
        .then(r => r.json())
    }

    deleteEvent = (oneEvent) => {
        console.log(oneEvent)
        return fetch(`${this.api}/teachers/${oneEvent.teacherId}/events/${oneEvent.id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
    }
}