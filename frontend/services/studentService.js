const request = require("request");

const connectApiHost = "http://localhost:3000"
const connectApiPath = "api/v1/students"

exports.getAll = () => {
  const allStudent = new Promise(function (resolve, reject) {
    const url = `${connectApiHost}/${connectApiPath}`;
    request.get(url, (error, response, body) => {
      console.log(body);
      if (error) {
        reject(error, 'Error:', error);
      } else if (response.statusCode !== 200) {
        reject(error, 'Error:', error);
        console.error(error, `Status code: ${response.statusCode}`);
      } else {
        console.log('Response body:', body);
        const result = JSON.parse(body);
        resolve(result.data);
      }
    });
  });
  return allStudent;
};

exports.create = (student) => {
  const createStudent = new Promise(function (resolve, reject) {
    const url = `${connectApiHost}/${connectApiPath}`;
    const options = {
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    };

    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        const data = JSON.parse(body);
        if (data.status === 'success') {
          resolve(data);
        } else {
          reject(data);
        }
      }
    });
  });

  return createStudent;
};

exports.findOne = (user) => {
  const promise = new Promise(function (resolve, reject) {
    console.log('findOne: ' + user.studentId);
    const url = `${connectApiHost}/${connectApiPath}/userId/${user.studentId}`;
    request.get(url, (error, response, body) => {
      if (error) {
        reject(error, 'Error:', error);
      } else if (response.statusCode !== 200) {
        reject(error, 'Error:', error);
        console.error(error, `Status code: ${response.statusCode}`);
      } else {
        console.log('Response body:', body);
        const result = JSON.parse(body);
        resolve(result.data);
      }
    });
  });

  return promise;
}

exports.findByLineId = (user) => {
  const promise = new Promise(function (resolve, reject) {
    console.log('findByLine: ' + user.lineId);
    const url = `${connectApiHost}/${connectApiPath}/lineId/${user.lineId}`;
    request.get(url, (error, response, body) => {
      if (error) {
        reject(error, 'Error:', error);
      } else if (response.statusCode !== 200) {
        reject(error, 'Error:', error);
        console.error(error, `Status code: ${response.statusCode}`);
      } else {
        console.log('Response body:', body);
        const result = JSON.parse(body);
        resolve(result.data);
      }
    });
  });

  return promise;
}