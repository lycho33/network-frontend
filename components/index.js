const api = new ApiService("http://localhost:3000")
const addBtn = document.querySelector('#add-event-btn')
const formDiv = document.querySelector('#header-links')

Teacher.getTeachers()
Event.getEvents()
Event.eventsForm()

initMap = () => {
    //new map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.1653, lng: -86.5264},
        zoom: 6,
        mapTypeId: 'terrain'
      });
    new google.maps.Marker({
      position: {lat: 39.1653, lng: -86.5264},
      map: map,
      animation: google.maps.Animation.DROP
    })
}

addBtn.addEventListener("click", () => {
  debugger
  if (eventForm.style.display === 'none'){
    eventForm.style.display = 'block' 
    } else {
      eventForm.style.display = 'none'
  }

})