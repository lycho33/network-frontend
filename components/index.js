const api = new ApiService("http://localhost:3000")
const modal = new Modal()

Teacher.getTeachers()
Teacher.renderTeacherButton()
Event.getEvents()
Event.renderEventButton()
Event.eventsForm()
Event.filterEvents()

initMap = () => {
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


