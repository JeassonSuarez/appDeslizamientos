import bcrypt from "bcrypt";

export const encriptar = async(contrasena) => {
    //10 indica cuantas veces aplicara el algoritmo
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(contrasena, salt);
}

export const desencriptar = async (constrasena, contrasenaEncriptada) =>{
    return await bcrypt.compare(constrasena, contrasenaEncriptada);
}