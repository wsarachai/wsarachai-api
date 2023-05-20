const request = require("request");

const connectApiHost = "http://localhost:3000"
const connectApiPath = "api/v1/users"

exports.getAllStudents = () => {
  const allStudent = new Promise(function (resolve, reject) {
    const url = `${connectApiHost}/${connectApiPath}`;
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
  return allStudent;
};

exports.createStudent = (student) => {
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
        resolve(body);
      }
    });
  });

  return createStudent;
};

exports.getStudent = (id) => {

};

exports.getStudent = (lineId) => {
};

exports.updateStudent = () => { };

exports.deleteStudent = () => { };