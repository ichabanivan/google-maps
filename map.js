var region, address, place_id, longitude, latitude, city, street, house, map, fullAddress;

function initMap() {
  // Местоположение: долгота, широта и коэффициент увеличения
  var latitude = 49.9874,
  longitude = 36.2306,
  mapZoom = 17;

  // Адрес до иконки с маркером
  var markerUrl = 'icon-location.png';

  var main_color = '#4a9cde', //основной цвет
  saturation_value = -1, // насыщенность
  brightness_value = 1; // яркость

  // Стили для элементов на карте
  var style = [
    {
      //Насыщенность обозначений на карте
      elementType: "labels",
      stylers: [
        {saturation: saturation_value}
      ]
    },
    {	//Скрываем обозначения станций метро, вокзалов, аэропортов и прочих транспортных узов на карте
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {visibility: "off"}
      ]
    },
    {
      //Скрываем обозначение дорог на карте
      featureType: 'road.highway',
      elementType: 'labels',
      stylers: [
        {visibility: "off"}
      ]
    },
    {
      //Скрываем обозначение локальных дорог
      featureType: "road.local",
      elementType: "labels.icon",
      stylers: [
        {visibility: "off"}
      ]
    },
    {
      //Скрываем обозначение магистрали на карте
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {visibility: "off"}
      ]
    },
    {
      //Скрываем дорожные обозначения на карте
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {visibility: "off"}
      ]
    },
    //Стили для разных элементов на карте
    {
      featureType: "transit",
      elementType: "geometry.fill",
      stylers: [
        {hue: main_color},
        {visibility: "on"},
        {lightness: brightness_value},
        {saturation: saturation_value}
      ]
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [
        {hue: main_color},
        {visibility: "on"},
        {lightness: brightness_value},
        {saturation: saturation_value}
      ]
    },
    {
      featureType: "poi.government",
      elementType: "geometry.fill",
      stylers: [
        {hue: main_color},
        {visibility: "on"},
        {lightness: brightness_value},
        {saturation: saturation_value}
      ]
    },
    {
      featureType: "poi.sport_complex",
      elementType: "geometry.fill",
      stylers: [
        {hue: main_color},
        {visibility: "on"},
        {lightness: brightness_value},
        {saturation: saturation_value}
      ]
    },
    {
      featureType: "poi.attraction",
      elementType: "geometry.fill",
      stylers: [
        {hue: main_color},
        {visibility: "on"},
        {lightness: brightness_value},
        {saturation: saturation_value}
      ]
    },
    {
      featureType: "poi.business",
      elementType: "geometry.fill",
      stylers: [
        {hue: main_color},
        {visibility: "on"},
        {lightness: brightness_value},
        {saturation: saturation_value}
      ]
    },
    {
      featureType: "transit",
      elementType: "geometry.fill",
      stylers: [
        {hue: main_color},
        {visibility: "on"},
        {lightness: brightness_value},
        {saturation: saturation_value}
      ]
    },
    {
      featureType: "transit.station",
      elementType: "geometry.fill",
      stylers: [
        {hue: main_color},
        {visibility: "on"},
        {lightness: brightness_value},
        {saturation: saturation_value}
      ]
    },
    {
      featureType: "landscape",
      stylers: [
        {hue: main_color},
        {visibility: "on"},
        {lightness: brightness_value},
        {saturation: saturation_value}
      ]

    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {hue: main_color},
        {visibility: "on"},
        {lightness: brightness_value},
        {saturation: saturation_value}
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {hue: main_color},
        {visibility: "on"},
        {lightness: brightness_value},
        {saturation: saturation_value}
      ]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {hue: main_color},
        {visibility: "on"},
        {lightness: brightness_value},
        {saturation: saturation_value}
      ]
    }
  ];

  var mapOptions = {
    // Координаты
    center: new google.maps.LatLng(latitude, longitude),
    panControl: true,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: true,
    styles: style,
    zoom: mapZoom
  };

  //Инициализация карты
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Позиция окна на карте
      // infoWindow.setPosition(pos);
      // Текст окна на карте
      // infoWindow.setContent('Location found.');

      position = new google.maps.LatLng(pos.lat, pos.lng);

      // Центр на карте
      map.setCenter(pos);
      // Центр маркера на карте
      marker.setPosition(position);


    });
  } else {
    alert("Browser doesn't support Geolocation")
  }

  function GetLocationLn(lang, lat, lng) {

    console.log(lang, lat, lng)
    var url = '//maps.googleapis.com/maps/api/geocode/json?&latlng=' + lat + ',' + lng + '&sensor=false&components=country&language=' + lang;

    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, false);
    xhr.onload = function () {
      var res = JSON.parse(this.responseText)

      if (res.status == "OK") {
        a = res;
        console.log(fullAddress)
        fullAddress = a.results[0].formatted_address;

        $('#pac-input').val(fullAddress)

        address = a.results[0].address_components;

        place_id = a.results[0].place_id;

        longitude = lng;
        latitude = lat;

        for (i in address) {
          if (!address[i].types.indexOf('administrative_area_level_1', 0)) {
            region = address[i].long_name;
          } else if (!address[i].types.indexOf('locality', 0)) {
            city = address[i].long_name;
          } else if (!address[i].types.indexOf('route', 0)) {
            street = address[i].long_name;
          } else if (!address[i].types.indexOf('street_number', 0)) {
            house = address[i].long_name;
          } else {

          }
        }

        $('#region').val(region)
        $('#place_id').val(place_id)
        $('#longitude').val(longitude)
        $('#latitude').val(latitude)
        $('#city').val(city)
        $('#street').val(street)
        $('#house').val(house)

        $('#address').html(fullAddress)

        infowindow.close();
        position = new google.maps.LatLng(latitude, longitude);

        marker.setPosition(position);

      } else {
        console.error("The place was not changed try again several times")

      }
    }
    xhr.onerror = function () {
      alert('Error ' + this.status);
    }
    xhr.send();
  }

  google.maps.event.addListener(map, 'click', function (e) {
    var lat = e.latLng.lat(),
    lng = e.latLng.lng();
    console.log(lat, lng)
    
    // GetLocationLn('en', lat, lng)
    GetLocationLn('uk', lat, lng)
  })



  var input = /** @type {HTMLInputElement} */(document.getElementById('pac-input'));

  var types = document.getElementById('type-selector');
  
  var countryRestrict = {'country': 'ua'};

  var autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['geocode'],
    componentRestrictions: countryRestrict
  });

  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();

  // Маркер на карте
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longitude),
    map: map,
    visible: true,
    icon: markerUrl
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function(e) {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(mapZoom);
    }
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: markerUrl,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    var lat = place.geometry.location.lat(), lng = place.geometry.location.lng();

    GetLocationLn('uk', lat, lng)

    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });
}
