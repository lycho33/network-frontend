const api = new ApiService("http://localhost:3000")
const modal = new Modal()

Teacher.getTeachers()
Teacher.renderTeacherButton()
Event.getEvents()
Event.renderEventButton()
Event.eventsForm()
Event.filterEvents()

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

    [
      {
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text",
        "stylers": [
          {
            "color": "#2e2929"
          }
        ]
      },
      {
        "featureType": "poi.school",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#d6d855"
          }
        ]
      },
      {
        "featureType": "poi.school",
        "elementType": "labels.text",
        "stylers": [
          {
            "weight": 7.5
          }
        ]
      },
      {
        "featureType": "water",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      }
    ]
}


