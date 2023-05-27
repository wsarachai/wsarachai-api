import { Request, Response } from "express";
import Attendance from "../models/attendance";

class CourseController {
  constructor() {}
  getAll = async (req: Request, res: Response) => {
    try {
      const results = await Attendance.find();
      res.status(200).json({
        status: "success",
        results: results.length,
        data: results,
      });
    } catch (err) {
      res.status(404).json({
        status: "failed",
        message: err,
      });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newObject = req?.body && (await Attendance.create(req.body));

      res.status(200).json({
        status: "success",
        data: newObject,
      });
    } catch (err) {
      res.status(400).json({
        status: "failed",
        message: err,
      });
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      const course = await Attendance.findById(req.params.id);
      // .populate("student")
      // .populate("session");
      res.status(200).json({
        status: "success",
        data: { course },
      });
    } catch (err) {
      res.status(404).json({
        status: "failed",
        message: err,
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const course = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        data: { course },
      });
    } catch (err) {
      res.status(404).json({
        status: "failed",
        message: err,
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await Attendance.findByIdAndDelete(req.params.id);

      res.status(200).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      res.status(404).json({
        status: "failed",
        message: err,
      });
    }
  };
}

export default new CourseController();
