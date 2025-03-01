import Usuario from '../auth/user.model.js'
 

export const existeEmail = async(correo = '') =>{
    const existeEmail = await Usuario.findOne({ correo });
 
    if(!existeEmail){
        throw new Error(`The email ${correo} already exists in the database`)
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);

    if(!existeUsuario){
        throw new Error(`The ${id} does not exist`);
    }
}