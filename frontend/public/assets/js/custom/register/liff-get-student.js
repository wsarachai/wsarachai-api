"use strict";

const ITSCIRegister = function () {

  // Elements
  let form;
  let submitButton;
  let _id;
  let lineId;
  let accessTokenHash;
  let studentId;
  let firstName;
  let lastName;
  let nickname;

  let handleForm = function (e) {
    submitButton.setAttribute('data-kt-indicator', 'on');

    liff.init({
      liffId: '1661172872-N4g4kl7y',
    }).then(() => {
      if (!liff.isLoggedIn()) {
        liff.login();
      }
      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: 'https://itsci.mju.ac.th/watcharin/student/register' });
      }

      if (liff.isLoggedIn()) {
        const context = liff.getContext();

        console.log(context);

        lineId.value = context.userId;
        accessTokenHash.value = context.accessTokenHash;

        $.get(`https://itsci.mju.ac.th/watcharin/student/line/${context.userId}`, (result, status) => {

          submitButton.removeAttribute('data-kt-indicator');

          const data = result.data;
          if (data) {
            console.log(data);
            studentId.value = data.studentId;
            firstName.value = data.firstName;
            lastName.value = data.lastName;
            nickname.value = data.nickname;
          }
          submitButton.disabled = false;
        });
      }
    });

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

  return {
    // Initialization
    init: function () {
      _id = document.querySelector("#_id");
      lineId = document.querySelector("#lineId");
      accessTokenHash = document.querySelector("#accessTokenHash");
      studentId = document.querySelector("#studentId");
      firstName = document.querySelector("#firstName");
      lastName = document.querySelector("#lastName");
      nickname = document.querySelector("#nickname");
      form = document.querySelector('#itsci_register_form');
      submitButton = document.querySelector('#itsci_register_submit');
      submitButton.disabled = true;

      handleForm();
    }
  };

}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  ITSCIRegister.init();
});
