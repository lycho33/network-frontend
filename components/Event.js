class Event {

    static all = []

    constructor(data){
        this.data = data
        this.constructor.all.push(this)
    }

    renderEvent = () => {
        const {name, date, city, state, country, furtherInfo, deadline, category, teacher_id} = this.data
        const eventsDiv = document.getElementById('eventList')

        eventsDiv.innerHTML += `
            <h3 data-id=${teacher_id}>Name: ${name}</h3>
            <h4 data-id=${teacher_id}>Date: ${date}</h4>
            <h4 data-id=${teacher_id}>Location: ${city}, ${state}</h4>
            <button>Update this Event</button><br>
            <br>
        `

        const eHeader = document.getElementById("eHeader")
        eHeader.innerHTML = `
         
            <h2>Event: ${category}</h2><br>
            <button id="add-event-btn">Add an Event</button>`

        const addBtn = document.querySelector('#add-event-btn')
        const formDiv = document.querySelector('#header-links')
        addBtn.addEventListener("click", this.display)        
    }

    display = () => {
        const formDiv = document.querySelector('#header-links')
        if (formDiv.style.display === 'none'){
          return formDiv.style.display = 'block' 
        } else {
            return formDiv.style.display = 'none'
        }
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

    //show all events on the page
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