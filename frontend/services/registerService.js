const request = require("request");

const connectApiHost = "http://localhost:3000";
const connectApiPath = "api/v1/registers";

exports.getAll = () => {
  const promise = new Promise(function (resolve, reject) {
    const url = `${connectApiHost}/${connectApiPath}`;

    const requestOptions = {
      url: url,
      json: true
    };

    request.get(requestOptions, (error, response, body) => {
      console.log(body);

      if (error) {
        reject(error, "Error:", error);
      } else if (response.statusCode !== 200) {
        reject(error, "Error:", error);
        console.error(error, `Status code: ${response.statusCode}`);
      } else {
        console.log("Response body:", body);
        resolve(body.data);
      }
    });
  });

  return promise;
};

exports.create = (obj) => {
  const promise = new Promise(function (resolve, reject) {
    const url = `${connectApiHost}/${connectApiPath}`;

    const requestOptions = {
      url: url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
      json: true,
    };

    request(requestOptions, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        if (body.status === "success") {
          resolve(body);
        } else {
          reject(body);
        }
      }
    });
  });

  return promise;
};

exports.findOne = (param) => {
  const promise = new Promise(function (resolve, reject) {
    const url = `${connectApiHost}/${connectApiPath}/code/${param}`;

    const requestOptions = {
      url: url,
      json: true
    };

    request.get(requestOptions, (error, response, body) => {
      //console.log(result);
      if (result.status === "success") {
        resolve(body.data);
      } else {
        reject(body.status);
      }
    });
  });

  return promise;
};

exports.findByStudentId = (param) => {
  const promise = new Promise(function (resolve, reject) {
    const url = `${connectApiHost}/${connectApiPath}/student/${param}`;

    const requestOptions = {
      url: url,
      json: true
    };

    request.get(requestOptions, (error, response, body) => {
      //console.log(result);
      if (body.status === "success") {
        resolve(body.data);
      } else {
        reject(body.status);
      }
    });
  });

  return promise;
};

exports.appendAttendance = (sessionId, obj) => {
  const promise = new Promise(function (resolve, reject) {
    const url = `${connectApiHost}/${connectApiPath}/add-atten/${sessionId}`;

    const requestOptions = {
      url: url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: obj,
      json: true,
    };

    request(requestOptions, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        if (body.status === "success") {
          resolve(body);
        } else {
          reject(body);
        }
      }
    });
  });
  return promise;
};