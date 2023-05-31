import { Router } from "express";
import { obtenerDatos } from "../controllers/tarea.controller.js";

const delizamientos = Router();

delizamientos.get('/listarDatos', obtenerDatos)


export default delizamientos;