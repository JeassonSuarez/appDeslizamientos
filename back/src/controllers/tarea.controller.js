import pool from "../mysql.js";

export const obtenerDatos = async (req, res) => {
    const resultado = await pool.query("SELECT * FROM datos");
    if (resultado.length>0) {
        res.status(200).json({hay: true ,data: resultado});
    }else{
        res.json({hay:false})
    }
}