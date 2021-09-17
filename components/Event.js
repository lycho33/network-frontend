class Event {

    static all = []

    constructor(data){
        this.data = data
        this.constructor.all.push(this)
    }

    renderEvent = () => {
        const {id, name, date, city, state, country, furtherInfo, deadline, category, teacher_id} = this.data
        const eventsDiv = document.getElementById('eventList')
        
        eventsDiv.innerHTML += `
            <div>
                <h3 data-id=${this.data.teacherId}>Name: ${name}</h3>
                <h4 data-id=${this.data.teacherId}>Date: ${date}</h4>
                <h4 data-id=${this.data.teacherId}>Location: ${city}, ${state}</h4>
                <button class="delete" id=${this.data.teacherId} data-id=${id}>Delete</button>
            </div><br>
        `
        const eHeader = document.getElementById("eHeader")
        eHeader.innerHTML = `<h3>Event: ${category}</h3><br>`      

        const deleteBtn = document.querySelectorAll('.delete')
        deleteBtn.forEach(btn => btn.addEventListener("click", this.handleDelete))
    }

    handleDelete = (e) => {
        e.preventDefault
        const oneEvent = {
            div: e.target.closest('div'),
            id: e.target.dataset.id,
            teacherId: e.target.id,
        }
        api.deleteEvent(oneEvent).then(() => oneEvent.div.remove())
   
    }
    
    //-------------FILTER Events--------------------------------------------->
    static filterEvents = () => {
        const concertsDiv = document.getElementById('concerts')
        const concertsBtn = document.createElement("button")
        concertsBtn.setAttribute('id', "concertBtn")
        concertsBtn.setAttribute('data-type', "concert")
        concertsBtn.innerText = "Concerts"
        concertsDiv.appendChild(concertsBtn)
        concertsBtn.addEventListener("click", this.handleEvents)

        const masterclassDiv = document.getElementById('masterclass')
        const masterclassBtn = document.createElement("button")
        masterclassBtn.setAttribute('id', "masterclassBtn")
        masterclassBtn.setAttribute('data-type', "masterclass")
        masterclassBtn.innerText = "MasterClass"
        masterclassDiv.appendChild(masterclassBtn)
        masterclassBtn.addEventListener("click", this.handleEvents)
        
        const summerFestivalDiv = document.getElementById('summer-festival')
        const summerFestivalBtn = document.createElement("button")
        summerFestivalBtn.setAttribute('id', "summerFestivalBtn")
        summerFestivalBtn.setAttribute('data-type', "summerFestival")
        summerFestivalBtn.innerText = "Summer Festival"
        summerFestivalDiv.appendChild(summerFestivalBtn)
        summerFestivalBtn.addEventListener("click", this.handleEvents)
    }
    static handleEvents = (e) => {
        e.preventDefault()
        const type = e.target.dataset.type
        const eventsList = document.getElementById('eventList')
        eventsList.innerHTML = ""
        switch (type){
            case "concert":
                const filterC = Event.all.filter(e => e.data.category === "Concert")
                Event.iterateEvents(filterC)
            break;
            case "masterclass":
                const filterM = Event.all.filter(e => e.data.category == "MasterClass")
                Event.iterateEvents(filterM)
            break;
            case "summerFestival":
                const filterS = Event.all.filter(e => e.data.category == "Summer Festival")
                Event.iterateEvents(filterS)
        }
    }

    //--------------MODAL EVENTS-------------------------------------->
    static renderEventButton = () => {
        const formDiv = document.querySelector('.buttons')
        const addBtn = document.createElement('button')
        addBtn.setAttribute('id', 'add-event-btn')
        addBtn.innerText = "Add an Event"
        addBtn.addEventListener("click", this.openEventForm)
        formDiv.appendChild(addBtn)
    }
    static find = (id) => this.all.find(event => event.data.id == id)
    static openEventForm = (e) => {
        modal.main.innerHTML = ""
        modal.open()
        
        // debugger
        // const tv = Teacher.all.find(t => {
            // let name = t.data.name
            // let id = t.data.id
            modal.main.innerHTML += `
                <h1 style="text-align: center">Add an Activity</h1>
                <form class="event-form">
                    <input type="text" name="name" value="" placeholder="Name of Event">
                    <input type="text" name="date" value="" placeholder="Date">
                    <select name="category" id="">
                        <option value="masterclass">MasterClass</option>
                        <option value="summerFestival">Summer Festival</option>
                        <option value="concert">Concert</option>
                    </select>
                    
             //iterate through Teacher.all 
                <select name="category" id="">
                  
                </select>
                
                    <input type="text" name="city" value="" placeholder="City">
                    <input type="text" name="state" value="" placeholder="State">
                    <input type="text" name="country" value="" placeholder="Country"><br>
                    <textarea rows="5" cols="74" type="text" name="furtherInfo" value="" placeholder="Enter any necessary information about the event"></textarea><br>
                    <button type="submit" class="submit-event">Submit Event</button>
                </form>`   
            // })
            modal.main.getElementsByClassName("event-form")[0].addEventListener("submit", this.handleSubmit) //??? why does this work for a local function?
    }
    
  
    //---------------------------------------------->
    static eventsForm = () => {
        const eventForm = document.querySelector('#header-links')
        eventForm.addEventListener('submit', this.handleSubmit)
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
            furtherInfo: e.target.furtherInfo.value,
            teacherId: e.target.teacher.id
        }
        api.createEvent(newEvent).then(event => {
            new Event(event).renderEvent()
        })
        e.target.reset()
    }
    static render = () => {
        this.all.forEach(event => event.renderEvent())
    }
    static iterateEvents = (event) => {
        const eventsList = document.getElementById('eventList')
        event.forEach(e => e.renderEvent())
    }
    static getEvents = () => {
        api.getEvents().then(events => {
            events.map(event => new Event(event))
            //map -> store into Event.all
            //we're calling Event twice and that's why it's not working
            this.render()
        })
    }
    
}