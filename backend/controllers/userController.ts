import { Request, Response } from "express";
import User from "../models/user";

class UserController {
  constructor() {}

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.status(200).json({
        status: "success",
        results: users.length,
        data: users,
      });
    } catch (err) {
      res.status(404).json({
        status: "failed",
        message: err,
      });
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const newUser = await User.create(req.body);
      res.status(200).json({
        status: "success",
        data: newUser,
      });
    } catch (err) {
      res.status(400).json({
        status: "failed",
        message: err,
      });
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
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

  updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
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
  deleteUser = async (req: Request, res: Response) => {
    try {
      await User.findByIdAndDelete(req.params.id);

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
  findByUserId = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ userId: req.params.id });
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
