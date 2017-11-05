Meteor.startup(function() {
  GoogleMaps.load({ v: '3', key: 'AIzaSyDzgiOABUWqCUWLMX6bXkRnPn-K6jqfua0', libraries: 'geometry,places' });
});

Template.mapPage.helpers({
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(13.1641, 100.9217),
        zoom: 12,
        // styles: [

        //   ]

      };
    }
  }
});

Meteor.subscribe('markers');

Template.mapPage.onCreated(function() {0

  // We can use the `ready` callback to interact with the map API once the map is ready.
	GoogleMaps.ready('mapEx', function(map) {

       google.maps.event.addListener(map.instance, 'click', function(event) {
        var point = {userId: Meteor.userId(),lat: event.latLng.lat(), lng: event.latLng.lng()};
        Meteor.call('markInsert',point);
      });

       console.log(document.getElementById('info-content'));

        var markers = {};
        var markers2 = []; //ใส่ mark ของ nearby
        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow({
          content: document.getElementById('info-content')
        });
        var service = new google.maps.places.PlacesService(map.instance);
        var hostnameRegexp = new RegExp('^https?://.+?/');

        var places = new google.maps.places.PlacesService(map.instance);

        var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
        var image2 = '/hospital-icon.png';
        var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map.instance);

        Tracker.autorun(function() {
          if(Session.get('lat') && Session.get('lng')) {
            let xy = {lat: Session.get('lat'), lng: Session.get('lng') };
            nearby(xy)
            GoogleMaps.maps.mapEx.instance.setCenter({ lat: Session.get('lat'), lng: Session.get('lng') });

            Session.set('lat',0);
            Session.set('lng',0);
          }

          // if(Session.get('nearLatLng')) {
          //   let xy = Session.get('nearLatLng');
          //   nearby(xy)
          //   // GoogleMaps.maps.mapEx.instance.setCenter({ lat: xy.lat, lng: xy.lng });
          //
          //   Session.set('nearLatLng',false);
          // }
         });

        Markers.find().observe({
          added: function(document) {
            Session.set('currentMark',document.userId);
            var latlng = new google.maps.LatLng(document.lat, document.lng);

            geocoder.geocode({'location': latlng}, function(results, status) {
              if (status === 'OK') {
                if (results[0]) {
                  Markers.update({_id : document._id},{$set:{address : results[0].formatted_address}});
                  map.instance.setZoom(15);
                  var marker = new google.maps.Marker({
                    // draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: latlng,
                    map: map.instance
                  });

                  // infowindow.setContent(results[0].formatted_address);
                  infowindow.open(map.instance, marker);
                  buildIWContent(results[0]);

                  // showInfoWindow();
                  // google.maps.event.addListener(marker, 'click', showInfoWindow);

                  google.maps.event.addListener(marker, 'click', function(event) {
                    // infowindow.setContent(results[0].formatted_address);
                    infowindow.open(map.instance, marker);
                    buildIWContent(results[0]);
                  });

                  // Store this marker instance within the markers object.
                  markers[document._id] = marker;
                  map.instance.setCenter(latlng);

                } else {
                  window.alert('No results found');
                }
              } else {
                window.alert('Geocoder failed due to: ' + status);
              }
            });

            // nearby(latlng);
            //
            // service.nearbySearch({
            //     location: latlng,
            //     radius: 1000,
            //     type: ['hospital'],
            //   }, function(results, status){
            //     if (status === google.maps.places.PlacesServiceStatus.OK) {
            //       for (var i = 0; i < results.length; i++) {
            //         createMarker(results[i],i);
            //       }
            //     }
            //   }
            // );
            console.log('observe - add - ' + document._id + ' ' + document.userId);
          },

          changed: function(newDocument, oldDocument) {
            // markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
          },
          removed: function(oldDocument) {
            // Remove the marker from the map
            markers[oldDocument._id].setMap(null);

            // Clear the event listener
            google.maps.event.clearInstanceListeners(
              markers[oldDocument._id]);

            // Remove the reference to this marker instance
            delete markers[oldDocument._id];

            clearMarkers();
            clearResults();
            console.log('observe - removed - ' + oldDocument._id);
          }
        });

        Nearbys.find().observe({
          added: function(document){
            // console.log(document.mark);
            if(document.mark){
              // console.log("nearby2");
              let latlngNearby = new google.maps.LatLng(document.lat, document.lng);
              service.nearbySearch({
                  location: latlngNearby,
                  radius: 1000,
                  type: ['hospital'],
                }, function(results, status){
                  if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (let i = 0; i < results.length; i++) {
                      let nearbyInfo = {
                        userId : document.userId,
                        lat : results[i].geometry.location.lat,
                        lng : results[i].geometry.location.lng,
                        name : results[i].name,
                        icon : results[i].icon,
                        vicinity : results[i].vicinity,
                        formatted_address : results[i].formatted_address,
                        formatted_phone_number : results[i].formatted_phone_number,
                        rating : results[i].rating,
                        website : results[i].website,
                      };
                      // users.update({_id : "Jack"},{$set:{age : 13, username : "Jack"}});
                      Meteor.call('insertNearbyMark', nearbyInfo);
                      // Nearbys.update({_id : document._id},{$set:{
                      //   name : results[i].name,
                      //   icon : results[i].icon,
                      //   vicinity : results[i].vicinity,
                      //   formatted_address : results[i].formatted_address,
                      //   formatted_phone_number : results[i].formatted_phone_number,
                      //   rating : results[i].rating,
                      //   website : results[i].website,
                      // }});
                    }
                  }
                }
              );
            }


          },
        });

        function nearby(xy){
          console.log("hi");
          clearMarkers();
          clearResults();
          service.nearbySearch({
              location: xy,
              radius: 1000,
              type: ['hospital'],
            }, function(results, status){
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                  createMarker(results[i],i);
                }
              }
            }
          );
        }

        function createMarker(place,j) {
          var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (j % 26));
          var markerIcon = MARKER_PATH + markerLetter + '.png';

          var placeLoc = place.geometry.location;

          markers2[j] = new google.maps.Marker({
            map: map.instance,
            position: placeLoc,
            animation: google.maps.Animation.DROP,
            icon: markerIcon,
          });

          addResult(place,j,markers2[j]);

          // console.log(place)

          // google.maps.event.addListener(m, 'click', showInfoWindow(place));
          markers2[j].placeResult = place;
          google.maps.event.addListener(markers2[j], 'click', showInfoWindow);
        }

        function clearMarkers() {
          console.log(markers2.length);
          for (var i = 0; i < markers2.length; i++) {
            if (markers2[i]) {
              markers2[i].setMap(null);
            }
          }
          markers2 = [];
          console.log(markers2.length);
        }

        function addResult(result, i,m) {
          //  var results = $('#results');Session.get('lng')
          console.log(Session.get('nearby'));
          // var results = document.getElementById(Session.get('nearby'));
          // //  var results = document.getElementById('results');
          //  var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
          //  var markerIcon = MARKER_PATH + markerLetter + '.png';
          //
          //  var tr = document.createElement('tr');
          //  tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
          //  tr.onclick = function() {
          //    google.maps.event.trigger(m, 'click');
          //  };
          //
          //  var iconTd = document.createElement('td');
          //  var nameTd = document.createElement('td');
          //  var icon = document.createElement('img');
          //  icon.src = markerIcon;
          //  icon.setAttribute('class', 'placeIcon');
          //  icon.setAttribute('className', 'placeIcon');
          //  var name = document.createTextNode(result.name);
          //  iconTd.appendChild(icon);
          //  nameTd.appendChild(name);
          //  tr.appendChild(iconTd);
          //  tr.appendChild(nameTd);
          //  results.appendChild(tr);

          var results = document.getElementById(Session.get('nearby'));
          var div = document.createElement('div');
           div.onclick = function() {
             google.maps.event.trigger(m, 'click');
           };
          div.setAttribute('class', 'item');
          div.setAttribute('data-value', i);
          var name = document.createTextNode(result.name);
          div.appendChild(name);
          results.appendChild(div);
          }

       function clearResults() {
         var results = document.getElementById(Session.get('nearby'));
        //  var results = document.getElementById('results');
         console.log(Session.get('nearby'));
         if(results){
           while (results.childNodes[0]) {
             results.removeChild(results.childNodes[0]);
           }
         }
       }

       function showInfoWindow() {
          let mark = this;
          places.getDetails({placeId: mark.placeResult.place_id},
              function(place, status) {
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                  return;
                }
                infowindow.open(map, mark);
                buildIWContent(place);
              });
        }

       function buildIWContent(place) {
         // console.log(place);
         if(place.icon){
           document.getElementById('iw-icon').style.display = '';
           document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
               'src="' + place.icon + '"/>';
         } else{
           document.getElementById('iw-icon').style.display = 'none';
         }

         if(place.name){
           document.getElementById('iw-url').style.display = '';
           document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
               '">' + place.name + '</a></b>';
         } else{
           document.getElementById('iw-url').style.display = 'none';
         }

         if(place.vicinity){
           document.getElementById('iw-address').style.display = '';
           document.getElementById('iw-address').textContent = place.vicinity;
         } else if(place.formatted_address){
           document.getElementById('iw-address').style.display = '';
           document.getElementById('iw-address').textContent = place.formatted_address;
         } else{
           document.getElementById('iw-address').style.display = 'none';
         }


         if (place.formatted_phone_number) {
           document.getElementById('iw-phone-row').style.display = '';
           document.getElementById('iw-phone').textContent =
               place.formatted_phone_number;
         } else {
           document.getElementById('iw-phone-row').style.display = 'none';
         }

         // Assign a five-star rating to the hotel, using a black star ('&#10029;')
         // to indicate the rating the hotel has earned, and a white star ('&#10025;')
         // for the rating points not achieved.
         if (place.rating) {
           var ratingHtml = '';
           for (var i = 0; i < 5; i++) {
             if (place.rating < (i + 0.5)) {
               ratingHtml += '&#10025;';
             } else {
               ratingHtml += '&#10029;';
             }
           document.getElementById('iw-rating-row').style.display = '';
           document.getElementById('iw-rating').innerHTML = ratingHtml;
           }
         } else {
           document.getElementById('iw-rating-row').style.display = 'none';
         }

         // The regexp isolates the first part of the URL (domain plus subdomain)
         // to give a short URL for displaying in the info window.
         if (place.website) {
           var fullUrl = place.website;
           var website = hostnameRegexp.exec(place.website);
           if (website === null) {
             website = 'http://' + place.website + '/';
             fullUrl = website;
           }
           document.getElementById('iw-website-row').style.display = '';
           document.getElementById('iw-website').textContent = website;
         } else {
           document.getElementById('iw-website-row').style.display = 'none';
         }
       }

	});
});

Template.mapPage.events({
  'click .btn': function(e){
    e.preventDefault();
     var markId = Markers.findOne({userId: this.userId});
    // console.log(markId);
    Markers.remove(markId._id);

  },
})
