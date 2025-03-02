import jwt from 'jsonwebtoken';

export const generarJWT =  (uid = ' ') => {
    return new Promise((resolve, reject) => {
        const playload = {uid};

        jwt.sign(
            playload,
            process.env.SECRETORPRYVATEKEY,
            {
                expiresIn: '1h'
            },
            (err, token) => {
                err ? (console.log(err), reject('Failed to generate token')) : resolve(token);
            }
        );
    });
}

export const esAdmin = async(req, res, next) =>{
    try {
         const { user } = req;
         if(!user || user.role!== "ADMIN_ROLE") return 
         res.status(403).send({
             succes: false,
             message: `No tienes acceso | username ${user.username}!!`
         });
         next()
    } catch (error) {
     console.error(error);
     return res.status(403).send({
         succes: false,
         message: 'Error con la autorizacion!'
     })
    }
 }