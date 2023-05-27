import axios from "axios";

interface ICourse {
  subject: {};
  term: number;
  semester: number;
}

class CourseService {
  private connectApiHost = "http://localhost:3000";
  private connectApiPath = "api/v1/courses";

  getAll = () => {
    const promise = new Promise((resolve, reject) => {
      const url = `${this.connectApiHost}/${this.connectApiPath}`;

      axios
        .get(url)
        .then((body) => {
          console.log(body);
          console.log("Response body:", body);
          resolve(body.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

    return promise;
  };

  create = (param: ICourse) => {
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

  findByCode = (param: any) => {
    const promise = new Promise((resolve, reject) => {
      const url = `${this.connectApiHost}/${this.connectApiPath}/code/${param}`;

      axios.get(url).then((body: any) => {
        if (body.status === "success") {
          resolve(body.data);
        } else {
          reject(body.status);
        }
      });
    });

    return promise;
  };
}
