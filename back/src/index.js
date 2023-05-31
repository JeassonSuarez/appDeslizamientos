import express from 'express';
import cors from "cors";
import { PORT } from './config.js';
import delizamientos from '../src/routes/tarea.routes.js';

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());

app.use(delizamientos)

app.listen(PORT);
console.log('Server on port', PORT)