const api = new ApiService("http://localhost:3001")
const modal = new Modal()

document.addEventListener("DOMContentLoaded", () => {
  Teacher.getTeachers()
  Teacher.renderTeacherButton()
  Event.getEvents()
  Event.renderEventButton()
  Event.eventsForm()
  Event.filterEvents()
})





