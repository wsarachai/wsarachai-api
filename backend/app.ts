import express, { ErrorRequestHandler } from "express";
import userRoute from "./router/userRoutes";
import courseRoute from "./router/courseRoutes";

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

    this.app.use("/api/v1/users", userRoute);
    this.app.use("/api/v1/courses", courseRoute);
    this.app.use(this.errorHandler);
  }
}

const app = new App().app;
export default app;
