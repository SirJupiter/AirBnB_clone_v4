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
});
