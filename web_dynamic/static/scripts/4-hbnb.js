const request = require('request');

$(document).ready(function() {
  // Initialize an empty array to store selected amenity IDs
  let selectedAmenityIds = [];

  // Listen for changes on each amenity checkbox
  $('.amenities input[type="checkbox"]').change(function() {
    const amenityId = $(this).parent().data('id');
    const amenityName = $(this).parent().data('name');

    if ($(this).is(':checked')) {
      // Add amenity ID to the selected list if checked
      selectedAmenityIds.push(amenityId);
    } else {
      // Remove amenity ID from the selected list if unchecked
      selectedAmenityIds = selectedAmenityIds.filter(id => id !== amenityId);
    }

    // Update the list of selected amenities in the H4 tag
    $('.amenities h4').text(
      selectedAmenityIds.map(id => amenityName).join(', ')
    );
  });



  const url = 'http://0.0.0.0:5001/api/v1/status';
    $.get(url, (response, status) => {
      if (status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });



  const url2 = 'http://0.0.0.0:5001/api/v1/places_search/';
  $.post({
    url: url2,
    contentType: "application/json",
    data: JSON.stringify({})
  }).done(function (response) {
    for (const place in response) {
      const placesSection = $('section.places');
      const article = `
          <article>
            <div class="title">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">
                <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                <br/>
                ${place.max_guest} Guests
              </div>
              <div class="number_rooms">
                <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                <br/>
                ${place.number_rooms} Bedroom
              </div>
              <div class="number_bathrooms">
                <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                <br/>
                ${place.number_bathrooms} Bathroom
              </div>
            </div>
            <div class="description">${place.description}</div>
          </article>
      `;

      placesSection.append(article);
    }
  });

  $('button').click(function () {
    
  });
});