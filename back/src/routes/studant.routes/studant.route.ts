import express, {Request, Response} from "express"
import { createStudant, deleteStudant, getStudant, updateStudant } from "../../service/studant.service/studant.service";


const router = express.Router();

router.get("/", async (req:Request, res:Response)=> {
    const studant = await getStudant();
    res.send(JSON.stringify(studant)).status(200);
})

router.post("/", async (req:Request, res:Response)=>{
    const studant = await createStudant(req.body);
    res.send(studant)
})
router.delete("/", async (req:Request, res:Response)=>{
    const studant = await deleteStudant(req.body.id);
    res.send(studant)
})
router.put("/", async (req:Request, res:Response)=>{
    const studant = await updateStudant(req.body.first, req.body.last, req.body.id);
    res.send(studant)
})



export default router;

