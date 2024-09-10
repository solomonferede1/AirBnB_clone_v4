/* global $ */
$(document).ready(function () {
  $.get('http://0.0.0.0:5001/api/v1/places_search/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
      console.log('success');
    } else {
      $('div#api_status').removeClass('available');
      console.log('Failed');
    }
  });

  $.post('http://0.0.0.0:5001/api/v1/places_search/', JSON.stringify({}), function (data) {
    // Clear the places section before appending new content
    $('section.places').empty();
  
    // Loop over each place and create the HTML structure
    data.forEach(place => {
      const article = `
        <article>
        <div class="title_box">
          <h2>{{ place.name }}</h2>
          <div class="price_by_night">{{ place.price_by_night }}</div>
        </div>
        <div class="information">
          <div class="max_guest">{{ place.max_guest }} Guest{% if place.max_guest != 1 %}s{% endif %}</div>
                <div class="number_rooms">{{ place.number_rooms }} Bedroom{% if place.number_rooms != 1 %}s{% endif %}</div>
                <div class="number_bathrooms">{{ place.number_bathrooms }} Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}</div>
        </div>
        <div class="description">
          {{ place.description | safe }}
        </div>
      </article>
        </article>
      `;
      // Append the article to the section.places
      $('section.places').append(article);
    });
  }, 'json')
  .fail(function (error) {
    console.log('Error fetching places:', error);
  });
  
  // Initialize an empty object to store selected amenities
  const selectedAmenities = {};

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    // Check if the checkbox is checked
    if ($(this).is(':checked')) {
      // Add the Amenity ID and Name to the selectedAmenities object
      selectedAmenities[amenityId] = amenityName;
    } else {
      // Remove the Amenity ID from the selectedAmenities object
      delete selectedAmenities[amenityId];
    }

    // Update the h4 tag inside the div Amenities with the list of checked Amenities
    updateAmenitiesText();
  });

  // Function to update the text in the h4 tag
  function updateAmenitiesText () {
    const amenitiesList = Object.values(selectedAmenities).join(', ');
    if (amenitiesList.length > 0) {
      $('.amenities h4').text(amenitiesList);
    } else {
      $('.amenities h4').html('&nbsp;');
    }
  }
});
