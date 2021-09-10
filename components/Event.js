class Event {

    static all = []

    constructor(data){
        this.data = data
        this.constructor.all.push(this)
    }

    // static renderForm = () => {
    //     const {name, date, city, state, country, furtherInfo, deadline, category, teacher_id} = this.data
    //     const formDiv = document.querySelector('#header-links')

    //     formDiv.innerHTML +=`
    //         <form id="event-form">
    //             <input type="text" name="name" value="" placeholder="Name of Event">
    //             <input type="text" name="date" value="" placeholder="Date">
    //             <select name="category" id="">
    //                 <option value="masterclass">MasterClass</option>
    //                 <option value="summerFestival">Summer Festival</option>
    //                 <option value="concert">Concert</option>
    //             </select>
    //             <select name="teacher" id="">
    //                 <option value="teahcer-name" data=${teacher_id}>${teacher_id}</option>
    //                 <option value="teacher-name" data=${teacher_id}>${teacher_id}</option>
    //                 <option value="teacher-name" data=${teacher_id}>${teacher_id}</option>
    //             </select><br>
    //             <input type="text" name="city" value="" placeholder="City">
    //             <input type="text" name="state" value="" placeholder="State">
    //             <input type="text" name="country" value="" placeholder="Country"><br>
    //             <textarea rows="5" cols="74" type="text" name="furtherInfo" value="" placeholder="Enter any necessary information about the event"></textarea><br>
    //             <button type="submit" class="submit-event">Submit Event</button>
    //         </form>
    //     `
    // }

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
            // this.renderForm()
        })
    }
    
}