const request = require("request");

const connectApiHost = "http://localhost:3000";
const connectApiPath = "api/v1/courses";

exports.getAll = () => {
  const results = new Promise(function (resolve, reject) {
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

  return results;
};

exports.create = (obj) => {
  const promise = new Promise(function (resolve, reject) {
    const url = `${connectApiHost}/${connectApiPath}`;

    const options = {
      url: url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
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

  return promise;
};

exports.findOne = (param) => {
  const promise = new Promise(function (resolve, reject) {
    const url = `${connectApiHost}/${connectApiPath}/code/${param}`;
    console.log(url);
    request.get(url, (error, response, body) => {
      if (body.status === "success") {
        console.log("Response body:", body);
        const result = JSON.parse(body);
        resolve(result.data);
      } else {
        reject(body.message);
        console.error(error, `Status code: ${response.statusCode}`);
      }
    });
  });

  return promise;
};
