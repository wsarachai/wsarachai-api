"use strict";

const ITSCIAttendance = function () {
  // Elements
  let form;
  let submitButton;
  let userLocation;

  const getLocation = () => {
    return new Promise((resolve, reject) => {

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };

  let handleForm = function (e) {
    // Show loading indication
    submitButton.attr("data-kt-indicator", "on");

    Promise.all([
      getLocation(),
      liff.init({ liffId: '1661172872-wDR1EMJv' })
    ]).then((results) => {
      const position = results[0];

      console.log(position);

      if (!liff.isLoggedIn()) {
        liff.login();
      }
      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: 'https://itsci.mju.ac.th/watcharin/student/atten' });
      }

      if (liff.isLoggedIn()) {
        const context = liff.getContext();

        console.log(context);

        submitButton.removeAttr('data-kt-indicator');
        const location = `{"latitude": ${position.coords.latitude}, "longitude":${position.coords.longitude}}`;
        userLocation.val(location);
        submitButton.prop('disabled', false);
      }
    }).catch((error) => {
      Swal.fire({
        text: `Sorry, ${error}`,
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn btn-primary"
        }
      });
    });

    // Handle form submit
    submitButton.click((e) => {
      e.preventDefault();
      submitButton.removeAttr('data-kt-indicator');

      // Enable button
      submitButton.prop('disabled', false);
      form.submit(); // submit form

      // var redirectUrl = form.getAttribute('data-kt-redirect-url');
      // if (redirectUrl) {
      //   location.href = redirectUrl;
      // }

    });
  }

  // Public functions
  return {
    // Initialization
    init: function () {
      // Elements
      form = $('#itsci_sign_in_form');
      userLocation = $('#userLocation');
      submitButton = $('#itsci_sign_in_submit');
      submitButton.prop('disabled', true);

      handleForm();
    }
  };

}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  ITSCIAttendance.init();
});
