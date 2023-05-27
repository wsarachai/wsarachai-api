import express, { ErrorRequestHandler } from "express";
import subjectRoute from "./router/subjectRoutes";
import sessionRoute from "./router/sessionRoutes";
import courseRoute from "./router/courseRoutes";
import studentRoute from "./router/studentRoutes";
import registerRoute from "./router/registerRoutes";
import attenRoute from "./router/attenRoutes";

class App {
  public app: express.Application = express();

  errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof Error) {
      res.status(404).json({
        status: "failed",
        message: err,
      });
      return;
    }
  };

  constructor() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use("/api/v1/subjects", subjectRoute);
    this.app.use("/api/v1/sessions", sessionRoute);
    this.app.use("/api/v1/courses", courseRoute);
    this.app.use("/api/v1/students", studentRoute);
    this.app.use("/api/v1/registers", registerRoute);
    this.app.use("/api/v1/attens", attenRoute);
    this.app.use(this.errorHandler);
  }
}

const app = new App().app;
export default app;
