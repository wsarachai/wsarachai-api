"use strict";

const successCallback = (position) => {
  const location = `{"latitude": ${position.coords.latitude}, "longitude":${position.coords.longitude}}`;
  document.getElementById("userLocation").value = location;
};

const errorCallback = (error) => {
  console.log(error);
  //   if (error.code == 1) {
  //     result.innerHTML =
  //       "You've decided not to share your position, but it's OK. We won't ask you again.";
  //   } else if (error.code == 2) {
  //     result.innerHTML =
  //       "The network is down or the positioning service can't be reached.";
  //   } else if (error.code == 3) {
  //     result.innerHTML =
  //       "The attempt timed out before it could get the location data.";
  //   } else {
  //     result.innerHTML = "Geolocation failed due to unknown error.";
  //   }
};

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

(function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options
    );
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
})();
