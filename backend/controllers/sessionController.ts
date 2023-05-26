import { Request, Response } from "express";
import Session from "../models/session";

class CourseController {
  constructor() {}
  getAll = async (req: Request, res: Response) => {
    try {
      const results = await Session.find().populate("course");
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
      const newObject = req?.body && (await Session.create(req.body));
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
      const course = await Session.findById(req.params.id).populate("course");
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
      const course = await Session.findByIdAndUpdate(req.params.id, req.body, {
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
      await Session.findByIdAndDelete(req.params.id);

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

  findByCode = async (req: Request, res: Response) => {
    try {
      const course = await Session.findOne({ code: req.params.id }).populate(
        "course"
      );
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

  createFromJson = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      Object.keys(data).forEach(async function (key) {
        const session = {
          course: data[key]["course"],
          startTime: data[key]["startTime"],
          hours: data[key]["hours"],
          dayOfWeek: data[key]["dayOfWeek"],
          location: data[key]["location"],
        };
        await Session.create(session);
      });
      res.status(200).json({
        status: "success",
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        status: "failed",
        message: err,
      });
    }
  };

}

export default new CourseController();
