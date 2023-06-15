"use strict";

const ITSCIRegister = function () {

  let liff_clientID;

  // Elements
  let form;
  let submitButton;
  let lineId;
  let accessTokenHash;
  let studentId;
  let firstName;
  let lastName;
  let nickname;

  const closeWindow = () => {
    setTimeout(() => { liff.closeWindow() }, 1000);
  };

  const sendMessages = (msg) => {
    if (!liff.isInClient()) {
      window.alert('This button is unavailable as LIFF is currently being opened in an external browser.');
    }
    else {
      liff.sendMessages([
        {
          type: 'text',
          text: `ITSCI: ${msg}`,
        },
      ]);
    }
  };

  const setFormData = (data) => {
    studentId.val(data.studentId);
    firstName.val(data.firstName);
    lastName.val(data.lastName);
    nickname.val(data.nickname);
  };

  const btnOnSave = function (e) {
    e.preventDefault();
    submitButton.removeAttr('data-kt-indicator');
    submitButton.prop('disabled', false);
    form.submit();

    sendMessages("บันทึกข้อมูลเรียบร้อยแล้ว");
    closeWindow();
  };

  const btnOnEdit = function (e) {
    e.preventDefault();
    submitButton.removeAttr('data-kt-indicator');
    submitButton.prop('disabled', false);

    firstName.prop("readonly", false);
    lastName.prop("readonly", false);
    nickname.prop("readonly", false);
    submitButton.html("บันทึก");

    submitButton.click(btnOnSave);
  };

  const findStudentById = (e) => {
    e.preventDefault();
    $.get(`https://itsci.mju.ac.th/watcharin/student/userId/${studentId.val()}`, (result, status) => {
      console.log(result.data);
      const data = result.data;

      if (data) {
        setFormData(data);
        submitButton.click(btnOnSave);
      }
      else {
        sendMessages("ไม่พบข้อมูลนักศึกษา");
        closeWindow();
      }
    });
  };

  let handleForm = (e) => {
    submitButton.attr("data-kt-indicator", "on");

    liff.init({
      liffId: liff_clientID,
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

        lineId.val(context.userId);
        accessTokenHash.val(context.accessTokenHash);

        const url = `https://itsci.mju.ac.th/watcharin/student/line/${context.userId}`;
        $.get(url, (result, status) => {

          submitButton.removeAttr('data-kt-indicator');

          const data = result.data;

          if (data) {
            // Found student
            console.log(data);
            studentId.prop("readonly", true);
            setFormData(data);
            $("h1").html("ข้อมูลนักศึกษา");
            submitButton.html("แก้ไข");

            submitButton.click(btnOnEdit);
          } else {
            $("h1").html("ลงทะเบียนนักศึกษา");
            submitButton.click(findStudentById);
          }
          submitButton.prop('disabled', false);
        });
      }
    });
  };

  return {
    init: function () {
      liff_clientID = $("#liff").val();
      lineId = $("#lineId");
      accessTokenHash = $("#accessTokenHash");
      studentId = $("#studentId");
      firstName = $("#firstName");
      lastName = $("#lastName");
      nickname = $("#nickname");
      form = $('#itsci_register_form');
      submitButton = $('#itsci_register_submit');
      submitButton.prop('disabled', true);

      handleForm();
    }
  };

}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  ITSCIRegister.init();
});
