import axios from "axios";

class SessionService {
  private connectApiHost: string = "http://localhost:3000";
  private connectApiPath: string = "api/v1/sessions";

  sessionFindById = (param: string) => {
    const promise = new Promise((resolve, reject) => {
      const url = `${this.connectApiHost}/${this.connectApiPath}/${param}`;

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

  sessionfindByCode = (param: string) => {
    const promise = new Promise((resolve, reject) => {
      const url = `${this.connectApiHost}/${this.connectApiPath}/code/${param}`;

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
}

export default new SessionService();
