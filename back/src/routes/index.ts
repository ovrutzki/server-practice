import express from "express"
import studant from "../routes/studant.routes/studant.route";

const router = express.Router();

router.use("/api/studant", studant) 


export default router;