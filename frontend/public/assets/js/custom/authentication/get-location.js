"use strict";

const ITSCIAttendance = function () {
  // Elements
  let form;
  let submitButton;
  let userLocation;

  let handleForm = function (e) {
    // Show loading indication
    submitButton.setAttribute('data-kt-indicator', 'on');

    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          submitButton.removeAttribute('data-kt-indicator');
          const location = `{"latitude": ${position.coords.latitude}, "longitude":${position.coords.longitude}}`;
          userLocation.value = location;
          submitButton.disabled = false;
        },
        (error) => {
          let errorMessage;
          submitButton.removeAttribute('data-kt-indicator');
          if (error.code == 1) {
            errorMessage =
              "You've decided not to share your position, but it's OK. We won't ask you again.";
          } else if (error.code == 2) {
            errorMessage =
              "The network is down or the positioning service can't be reached.";
          } else if (error.code == 3) {
            errorMessage =
              "The attempt timed out before it could get the location data.";
          } else {
            errorMessage = "Geolocation failed due to unknown error.";
          }
          Swal.fire({
            text: `Sorry, ${errorMessage}`,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary"
            }
          });
        },
        options
      );
    } else {
      Swal.fire({
        text: "Sorry, Geolocation is not supported by this browser.",
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn btn-primary"
        }
      });
    }

    // Handle form submit
    submitButton.addEventListener('click', function (e) {
      e.preventDefault();
      submitButton.removeAttribute('data-kt-indicator');

      // Enable button
      submitButton.disabled = false;
      form.submit(); // submit form

      // var redirectUrl = form.getAttribute('data-kt-redirect-url');
      // if (redirectUrl) {
      //   location.href = redirectUrl;
      // }

    });
  };

  // Public functions
  return {
    // Initialization
    init: function () {
      // Elements
      form = document.querySelector('#itsci_sign_in_form');
      userLocation = document.querySelector('#userLocation');
      submitButton = document.querySelector('#itsci_sign_in_submit');
      submitButton.disabled = true;

      handleForm();
    }
  };

}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  ITSCIAttendance.init();
});
