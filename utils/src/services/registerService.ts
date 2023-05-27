import axios from "axios";

interface IRegister {
  student: string;
  session: string;
  midTermScore: number;
  finalScore: number;
  projectScore: number;
  grade: string;
}

class RegisterService {
  private connectApiHost = "http://localhost:3000";
  private connectApiPath = "api/v1/registers";

  getAll = () => {
    const promise = new Promise((resolve, reject) => {
      const url = `${this.connectApiHost}/${this.connectApiPath}`;
      axios
        .get(url)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject("Error:" + error);
        });
    });

    return promise;
  };

  create = (param: IRegister) => {
    const promise = new Promise((resolve, reject) => {
      const url = `${this.connectApiHost}/${this.connectApiPath}`;

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

  findOne = (param: string) => {
    const promise = new Promise((resolve, reject) => {
      const url = `${this.connectApiHost}/${this.connectApiPath}/${param}`;

      axios
        .get(url)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject("Error:" + error);
        });
    });

    return promise;
  };

  findByStudentId = (param: string) => {
    const promise = new Promise<IRegister[]>((resolve, reject) => {
      const url = `${this.connectApiHost}/${this.connectApiPath}/student/${param}`;

      axios
        .get(url)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject("Error:" + error);
        });
    });

    return promise;
  };
}

export default new RegisterService();
