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
    request.get(url, (error, response, body) => {
      const result = JSON.parse(body);
      console.log(result);
      if (result.status === "success") {
        resolve(result.data);
      } else {
        reject(result.status);
      }
    });
  });

  return promise;
};
