import User from './user.model.js';
import { hash, verify } from 'argon2';
import { generarJWT } from '../helpers/generate-jwt.js';

export const  login = async(req, res) => {
    try {        
        const {loginuser , password} = req.body;

        const user = await User.findOne({
            $or: [{email: loginuser}, 
                {username: loginuser}]
        }) 

        if(!user){
            return res.status(400).json({
                msg: 'Credenciales incorrectas, el correo electrónico no existe en la base de datos'
            });
        }

        const validPassword = await verify(user.password, password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            })
        }

        const token = await generarJWT(user.id);

        res.status(200).json({
            msg: 'Inicio de sesión exitoso!',
            userDetails: {
                username: user.username,
                token: token,
                profilePicture: user.profilePicture
            }
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Error del servidor",
            error: e.message
        })
    }
}

const createUserAdmin = async (name, surname, username, email, password, role) => {
    try {
        if (role === "ADMIN_ROLE" && await User.exists({ role: "ADMIN_ROLE" })) return null;
        
        const newUser = new User({
            name, 
            surname, 
            username, 
            email, 
            password: await hash(password),
            role
        });
        
        await newUser.save();
        console.log("User created successfully:", newUser);
        return newUser;
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
};

createUserAdmin("Cristian", "Rosas", "Crosas","crosas@gmail.com", "12345678", "ADMIN_ROLE");