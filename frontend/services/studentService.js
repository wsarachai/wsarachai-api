const request = require("request");

const connectApiHost = "http://localhost:3000";
const connectApiPath = "api/v1/students";

exports.getAll = () => {
  const allStudent = new Promise(function (resolve, reject) {
    const url = `${connectApiHost}/${connectApiPath}`;
    request.get(url, (error, response, body) => {
      console.log(body);
      if (error) {
        reject(error, "Error:", error);
      } else if (response.statusCode !== 200) {
        reject(error, "Error:", error);
        console.error(error, `Status code: ${response.statusCode}`);
      } else {
        console.log("Response body:", body);
        const result = JSON.parse(body);
        resolve(result.data);
      }
    });
  });
  return allStudent;
};

exports.update = (id, student) => {
  const createStudent = new Promise(function (resolve, reject) {
    const url = `${connectApiHost}/${connectApiPath}/${id}`;
    console.log(url);
    const options = {
      url: url,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    };

    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        const data = JSON.parse(body);
        if (data.status === "success") {
          resolve(data);
        } else {
          reject(data);
        }
      }
    });
  });

  return createStudent;
};

exports.findByStudentId = (studentId) => {
  const promise = new Promise(function (resolve, reject) {
    console.log("findOne: " + studentId);
    const url = `${connectApiHost}/${connectApiPath}/userId/${studentId}`;
    request.get(url, (error, response, body) => {
      if (error) {
        reject(error, "Error:", error);
      } else if (response.statusCode !== 200) {
        reject(error, "Error:", error);
        console.error(error, `Status code: ${response.statusCode}`);
      } else {
        console.log("Response body:", body);
        const result = JSON.parse(body);
        resolve(result.data);
      }
    });
  });

  return promise;
};

exports.findByLineId = (lineId) => {
  console.log("findByLine: " + lineId);
  const promise = new Promise(function (resolve, reject) {
    const url = `${connectApiHost}/${connectApiPath}/lineId/${lineId}`;
    request.get(url, (error, response, body) => {
      if (error) {
        //reject(error, "Error:", error);
        console.log(error);
      } else if (response.statusCode !== 200) {
        //reject(error, "Error:", error);
        console.error(error, `Status code: ${response.statusCode}`);
      } else {
        console.log("Response body:", body);
        const result = JSON.parse(body);
        resolve(result.data);
      }
    });
  });

  return promise;
};
