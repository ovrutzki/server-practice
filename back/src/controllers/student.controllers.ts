import {
  getStudant,
  createStudant,
  deleteStudant,
  updateStudant,
} from "../service/studant.service/studant.service";
import express, { Request, Response } from "express";

export const getAllStudants = async (req: Request, res: Response) => {
  try {
    const studants = await getStudant();
    return res
      .status(200)
      .json(studants);
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

export const addStudants = async (req: Request, res: Response) => {
  try {
    const studants = createStudant(req.body);
    return res
      .status(200)
      .json({
        status: 200,
        data: studants,
        message: "Successfully Create Studant",
      });
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

export const removeStudants = async (req: Request, res: Response) => {
  try {
    const studants = deleteStudant(req.body);
    return res
      .status(200)
      .json({
        status: 200,
        data: studants,
        message: "Successfully Remove Studant",
      });
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};
export const changeStudant = async (req: Request, res: Response) => {
  try {
    const studants = updateStudant(req.body._id, req.body);
    return res
      .status(200)
      .json({
        status: 200,
        data: studants,
        message: "Successfully Update Studant",
      });
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};
