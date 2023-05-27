import axios from "axios";

const connectApiHost: string = "http://localhost:3000";
const connectApiPath: string = "api/v1/sessions";

const sessionFindById = (param: string) => {
  const promise = new Promise(function (resolve, reject) {
    const url = `${connectApiHost}/${connectApiPath}/${param}`;

    axios
      .get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject("Error:" + error);
      });
  });

  return promise;
};

const sessionfindByCode = (param: string) => {
  const promise = new Promise(function (resolve, reject) {
    const url = `${connectApiHost}/${connectApiPath}/code/${param}`;

    axios
      .get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
};

export { sessionFindById, sessionfindByCode };
