import Compania from './compania.model.js';
import User from '../auth/user.model.js';
import { hash, verify } from 'argon2';
import { generarJWT } from '../helpers/generate-jwt.js';


export const register = async (req, res) => {
    try {
        let data = req.body

        const existingCompaniat = await Compania.findOne({ name: data.name });
        if(existingCompania)return res.status(400).send({
            success: false,
            message: 'Client with this name already exists.',
        });

        let Compania = new Compania(data)
        await Compania.save()
        
        return res.status(200).send({
            success: true,
            message: `Register ${Compania.name} successfully`
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error registering',error
        });
    }
}