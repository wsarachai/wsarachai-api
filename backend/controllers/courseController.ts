import { Request, Response } from "express";
import Course from "../models/course";

class CourseController {
  constructor() {}
  getAllCourses = async (req: Request, res: Response) => {
    try {
      const courses = await Course.find();
      res.status(200).json({
        status: "success",
        results: courses.length,
        data: courses,
      });
    } catch (err) {
      res.status(404).json({
        status: "failed",
        message: err,
      });
    }
  };

  createCourse = async (req: Request, res: Response) => {
    try {
      const newCourse = await Course.create(req.body);
      res.status(200).json({
        status: "success",
        data: newCourse,
      });
    } catch (err) {
      res.status(400).json({
        status: "failed",
        message: err,
      });
    }
  };

  getCourse = async (req: Request, res: Response) => {
    try {
      const course = await Course.findById(req.params.id);
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

  updateCourse = async (req: Request, res: Response) => {
    try {
      const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
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

  deleteCourse = async (req: Request, res: Response) => {
    try {
      await Course.findByIdAndDelete(req.params.id);

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

  findByCourseCode = async (req: Request, res: Response) => {
    try {
      const course = await Course.findOne({ code: req.params.id });
      res.status(200).json({
        status: "success",
        data: course,
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
