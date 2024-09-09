/* global $ */
$(document).ready(function () {
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
