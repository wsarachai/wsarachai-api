import axios from "axios";

const connectApiHost: string = "http://localhost:3000";
const connectApiPath: string = "api/v1/registers";

interface IRegister {
  student: string;
  session: string;
  midTermScore: number;
  finalScore: number;
  projectScore: number;
  grade: string;
}

const registerFindById = (param: string) => {
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

const registerfindByCode = (param: string) => {
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

const registerCreate = (param: IRegister) => {
  const promise = new Promise(function (resolve, reject) {
    const url = `${connectApiHost}/${connectApiPath}`;

    axios
      .post(url, param)
      .then((response) => {
        if (response.data === "success") {
          resolve(response.data);
        } else {
          reject(response.data.status);
        }
      })
      .catch((error) => {
        reject(error.message);
      });
  });

  return promise;
};

export { registerFindById, registerfindByCode, registerCreate };
