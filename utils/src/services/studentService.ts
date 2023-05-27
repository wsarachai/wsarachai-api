import axios from "axios";

interface IStudent {
  _id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  nickname: string;
  lineId: string;
}

class StudentService {
  private connectApiHost = "http://localhost:3000";
  private connectApiPath = "api/v1/students";

  getAll = () => {
    const promise = new Promise<IStudent>((resolve, reject) => {
      const url = `${this.connectApiHost}/${this.connectApiPath}`;
      axios
        .get(url)
        .then((body) => {
          resolve(body.data.data);
        })
        .catch(reject);
    });
    return promise;
  };

  update = (id: string, student: IStudent) => {
    const promise = new Promise<IStudent>((resolve, reject) => {
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

  findByStudentId = (studentId: string) => {
    const promise = new Promise<IStudent>((resolve, reject) => {
      const url = `${this.connectApiHost}/${this.connectApiPath}/userId/${studentId}`;
      axios
        .get(url)
        .then((body) => {
          resolve(body.data.data);
        })
        .catch(reject);
    });

    return promise;
  };

  findByLineId = (lineId: string) => {
    const promise = new Promise<IStudent>((resolve, reject) => {
      const url = `${this.connectApiHost}/${this.connectApiPath}/lineId/${lineId}`;
      axios
        .get(url)
        .then((body) => {
          resolve(body.data.data);
        })
        .catch(reject);
    });

    return promise;
  };
}

export default new StudentService();
