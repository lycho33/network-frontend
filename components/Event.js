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