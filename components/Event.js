class Event {

    static all = []

    constructor(data){
        this.data = data
        this.constructor.all.push(this)
    }

    // static eventsHeader = () => {
    //     const {name, date, city, state, country, furtherInfo, deadline, category} = this.data
    //     const eHeader = document.getElementById("eHeader")
    //     let h2 = document.createElement('h2')
    //     h2.innerText = `Events: ${category}`
    //     eHeader.appendChild(h2)
    // }

    renderEvent = () => {
        const {name, date, city, state, country, furtherInfo, deadline, category} = this.data
        const eventsDiv = document.querySelector(".events") 

        // const button = document.createElement("button")
        // button.id = "createEvent"
        // button.innerText = "Add an Event"
        // button.addEventListener("click", this)
        // eventsDiv.append(button)

        eventsDiv.innerHTML += `
            <h3>Name: ${name}</h3>
            <h4>Date: ${date}</h4>
            <h4>Location: ${city}, ${state}</h4>
            <br>
        `

        const eHeader = document.getElementById("eHeader")
        eHeader.innerHTML = `<h2>Event: ${category}</h2><br>`
    }

    static handleSubmit = (e) => {
        e.preventDefault()
        const newEvent = {
            name: e.target.name.value,
            date: e.target.date.value,
            category: e.target.category.value,
            city: e.target.city.value,
            state: e.target.state.value,
            country: e.target.country.value,
            furtherInfo: e.target.furtherInfo.value
        }
        api.createEvent(newEvent).then(event => {
            new Event(event).renderEvent()
        })
        e.target.reset()
    }

    static eventsForm = () => {
        const eventForm = document.querySelector('#header-links')
        eventForm.addEventListener('submit', this.handleSubmit)
    }


    static render = () => {
        this.all.forEach(event => event.renderEvent())
    }

    static getEvents = () => {
        api.getEvents().then(events => {
            events.forEach(event => new Event(event))
            this.render()
        })
    }
    
}