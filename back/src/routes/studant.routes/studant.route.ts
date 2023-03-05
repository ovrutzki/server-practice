import express, { Request, Response } from "express";
import {
  createStudant,
  deleteStudant,
  getStudant,
  updateStudant,
} from "../../service/studant.service/studant.service";
var bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const studant = await getStudant();
  res.send(JSON.stringify(studant)).status(200);
});

router.post("/", async (req: Request, res: Response) => {
  const studant = await createStudant(req.body);
  res.send(studant);
});
router.delete("/", async (req: Request, res: Response) => {
  const studant = await deleteStudant(req.body.id);
  res.send(studant);
});
router.put("/", async (req: Request, res: Response) => {
  const studant = await updateStudant(
    req.body.first,
    req.body.last,
    req.body.id,
    req.body.email,
    req.body.password
  );
  res.send(studant);
});
router.post("/register", async (req: Request, res: Response) => {
    const { first, last,id, email, password } = req.body;
    const allStudant = await getStudant();
    const oldUser = allStudant.filter((stu: any) => stu.email === email);
  try {
    if (!(first && last && email && password)) {
        console.log(first,last,email,password)
      res.status(400).send("All inputs are require");
    } 
    // if (oldUser) {
    //   return res.status(409).send("User already exist");
    // }
    const encryptedPassword = await bcrypt.hash(password, 10);

    const studant = await allStudant.push({
      first,
      last,
      id,
      email: email,
      password: encryptedPassword,
    });

    res.status(200).json(studant);
  } catch (err) {
    console.log(err);
  }
});

export default router;
