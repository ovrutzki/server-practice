import express from 'express';
import routes from "../src/routes/index";
import bodyParser from "body-parser";
import cors from "cors";
import { connectToDB } from '../connection';

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

app.use(routes);

app.listen(8000, () => console.log("Listening on http://localhost:8000"));

connectToDB()