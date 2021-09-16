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
        center: {lat: 39.175353959949646, lng: -86.5118220484774},
        zoom: 3.7,
        mapId: '24e605651e9bcf48'
      });
      const marker = "https://o.remove.bg/downloads/4cf6963f-b14f-4193-83df-5fc5cfc1af16/544-5441588_address-transparent-location-icon-yellow-hd-png-download-removebg-preview.png"
    new google.maps.Marker({
      position: {lat: 39.1653, lng: -86.5264},
      map: map,
      title: "Welcome!",
      animation: google.maps.Animation.DROP,
      icon: {
        url: marker,
        scaledSize: new google.maps.Size(38, 31)
      }
    })
}


