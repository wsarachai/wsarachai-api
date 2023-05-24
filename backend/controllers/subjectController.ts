import { Request, Response } from "express";
import Subject from "../models/subject";

class UserController {
  constructor() {}

  getAll = async (req: Request, res: Response) => {
    try {
      const results = await Subject.find();
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
      const newObject = req?.body && (await Subject.create(req.body));
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
      const obj = await Subject.findById(req.params.id);
      res.status(200).json({
        status: "success",
        data: { obj },
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
      const obj = await Subject.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        data: { obj },
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
      await Subject.findByIdAndDelete(req.params.id);

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
      const obj = await Subject.findOne({ userId: req.params.id });
      res.status(200).json({
        status: "success",
        data: obj,
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
