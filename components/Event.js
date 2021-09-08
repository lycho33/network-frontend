class Event {

    constructor(data, teacher){
        this.data = data
        this.teacher = teacher
    }

    render = () => {
        const {name, date, location, furtherInfo, deadline, category} = this.data
        document.querySelector(".event").innerHTML += `
            <h3>${name}</h3>
        `
    }
    
}