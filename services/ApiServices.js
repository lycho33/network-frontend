class ApiService {

    constructor(api){
        this.api = api
    }

    getTeachers = () => fetch(this.api + "/teachers").then(r => r.json())   
    getEvents = () => fetch(this.api + "/events").then(r => r.json())

 
    createTeacher = (newTeacher) => {
        return fetch (`${this.api}/teachers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTeacher),
        })
        .then(r => r.json())
    }

    createEvent = (newEvent) => {
        return fetch (`${this.api}/teachers/${newEvent.teacherId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent),
        })
        .then(r => r.json())
    }
}