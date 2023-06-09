const loadRegister = (liffId) => {
  liff.init({
    liffId: liffId, // Use own liffId
  }).then(() => {
    if (!liff.isLoggedIn()) {
      liff.login();
    }
    if (!liff.isLoggedIn()) {
      liff.login({ redirectUri: 'https://itsci.mju.ac.th/watcharin/register.html' });
    }
    if (liff.isLoggedIn()) {
      const context = liff.getContext();
      $.get(`https://itsci.mju.ac.th/watcharin/student/${context.userId}`, (result, status) => {
        const data = result.data;
        console.log(context);
        console.log(data);
        document.querySelector("#lineId").value = context.userId;
        document.querySelector("#accessTokenHash").value = data.accessTokenHash;
        document.querySelector("#studentId").value = data.studentId;
        document.querySelector("#firstName").value = data.firstName;
        document.querySelector("#lastName").value = data.lastName;
        document.querySelector("#nickname").value = data.nickname;
      });
    }

    // sendMessages call
    if (!liff.isInClient()) {
      window.alert('This button is unavailable as LIFF is currently being opened in an external browser.');
    } else {
      //liff.sendMessages([
      //  {
      //    type: 'text',
      //    text: 'Hello, World!',
      //  },
      //]).then(() => {
      //  window.alert('Message sent');
      //}).catch((error) => {
      //  window.alert('Error sending message: ' + error);
      //});
    }
  }).catch((err) => {
    console.log(err);
  });
};

const loadProfile = (liffId) => {
  liff.init({
    liffId: liffId, // Use own liffId
  }).then(() => {
    if (!liff.isLoggedIn()) {
      liff.login();
    }
    if (!liff.isLoggedIn()) {
      liff.login({ redirectUri: 'https://itsci.mju.ac.th/watcharin/register.html' });
    }
    if (liff.isLoggedIn()) {
      const context = liff.getContext();
      $.get(`https://itsci.mju.ac.th/watcharin/student/${context.userId}`, (result, status) => {
        const data = result.data;
        console.log(context);
        console.log(data);
        document.querySelector("#lineId").value = context.userId;
        document.querySelector("#accessTokenHash").value = data.accessTokenHash;
        document.querySelector("#studentId").value = data.studentId;
        document.querySelector("#firstName").value = data.firstName;
        document.querySelector("#lastName").value = data.lastName;
        document.querySelector("#nickname").value = data.nickname;
      });
    }
  }).catch((err) => {
    console.log(err);
  });
};