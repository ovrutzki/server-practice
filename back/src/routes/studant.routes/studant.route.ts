import express, { Request, Response } from "express";
import {
  getAllStudants, addStudants, removeStudants, changeStudant
} from "../../controllers/student.controllers";
var bcrypt = require("bcrypt");

const router = express.Router();

router.get("/",getAllStudants );

router.post("/", addStudants);

router.delete("/",removeStudants );

router.put("/", changeStudant);

// router.post("/register", async (req: Request, res: Response) => {
//     const { first, last,id, email, password } = req.body;
//     const allStudant = await getStudant();
//     const oldUser = allStudant.filter((stu: any) => stu.email === email);
//   try {
//     if (!(first && last && email && password)) {
//         console.log(first,last,email,password)
//       res.status(400).send("All inputs are require");
//     } 
// cryptedPassword = await bcrypt.hash(password, 10);

//     const studant = await allStudant.push({
//       first,
//       last,
//       id,
//       email: email,
//       password: encryptedPassword,
//     });

//     res.status(200).json(studant);
//   } catch (err) {
//     console.log(err);
//   }
// });

export default router;
