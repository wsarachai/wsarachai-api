import { Request, Response } from "express";
import Student from "../models/student";

class UserController {
  constructor() {}

  getAll = async (req: Request, res: Response) => {
    try {
      const results = await Student.find();
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
      const newObject = req?.body && (await Student.create(req.body));
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

  createFromJson = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      Object.keys(data).forEach(async function (key) {
        const stu = {
          studentId: data[key]["studentId"],
          firstName: data[key]["firstName"],
          lastName: data[key]["lastName"],
          nickname: data[key]["nickname"],
        };
        await Student.create(stu);
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

  get = async (req: Request, res: Response) => {
    try {
      const user = await Student.findById(req.params.id);
      res.status(200).json({
        status: "success",
        data: { user },
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
      const user = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        data: { user },
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
      await Student.findByIdAndDelete(req.params.id);

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

  findById = async (req: Request, res: Response) => {
    try {
      const user = await Student.findOne({ studentId: req.params.id });
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (err) {
      res.status(404).json({
        status: "failed",
        message: err,
      });
    }
  };

  findByLineId = async (req: Request, res: Response) => {
    try {
      const user = await Student.findOne({ lineId: req.params.id });
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (err) {
      res.status(404).json({
        status: "failed",
        message: err,
      });
    }
  };
}

export default new UserController();
