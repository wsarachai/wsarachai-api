import axios from "axios";

class StudentService {
  private connectApiHost = "http://localhost:3000";
  private connectApiPath = "api/v1/students";

  getAll = () => {
    const promise = new Promise((resolve, reject) => {
      const url = `${this.connectApiHost}/${this.connectApiPath}`;
      axios
        .get(url)
        .then((body) => {
          const result = JSON.parse(body.data);
          resolve(result.data);
        })
        .catch(reject);
    });
    return promise;
  };

  update = (id: any, student: any) => {
    const promise = new Promise((resolve, reject) => {
      const url = `${this.connectApiHost}/${this.connectApiPath}/${id}`;
      axios
        .patch(url, student)
        .then((response) => {
          if (response.data === "success") {
            resolve(response.data);
          } else {
            reject(response.data.status);
          }
        })
        .catch(reject);
    });
    return promise;
  };

  findByStudentId = (user: any) => {
    const promise = new Promise((resolve, reject) => {
      const url = `${this.connectApiHost}/${this.connectApiPath}/userId/${user.studentId}`;
      axios
        .get(url)
        .then((body) => {
          resolve(body.data);
        })
        .catch(reject);
    });

    return promise;
  };

  findByLineId = (user: any) => {
    const promise = new Promise((resolve, reject) => {
      const url = `${this.connectApiHost}/${this.connectApiPath}/lineId/${user.lineId}`;
      axios
        .get(url)
        .then((body) => {
          resolve(body.data);
        })
        .catch(reject);
    });

    return promise;
  };
}

export default new StudentService();
