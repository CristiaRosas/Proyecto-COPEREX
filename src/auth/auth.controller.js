import User from './user.model.js';
import Compania from '../companias/compania.model.js';
import { hash, verify } from 'argon2';
import { generarJWT  } from '../helpers/generate-jwt.js';

export const  login = async(req, res) => {
    try {        
        const {loginuser , password} = req.body;

        const user = await User.findOne({
            $or: [{email: loginuser}, 
                {username: loginuser}]
        }) 
        console.log(user);
        

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

        const token = await generarJWT(user._id);
        console.log(token);
        

        res.status(200).json({
            msg: `Inicio de sesión exitoso!, Bienvenido ${user.name}`,
            userDetails: {
                token: token,
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

export const registerClient = async (req, res) => {
    try {
        const data = req.body;
        const company = await Compania.findOne({name: data.name})

        const user = await User.create({
            name: data.name,
            surname: data.surname,
            username: data.username,
            email: data.email,
            relacion: company._id
        })

        return res.status(201).json({
            message: 'User registered successfully',
            userDetails: {
                user: user.email,
                company: company.name
            }
        });

    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            message: "User registration failed",
            error: err.message
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