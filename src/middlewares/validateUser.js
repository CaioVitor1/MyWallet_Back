import { db } from '../dbStrategy/mongo.js'

async function validateUser(req, res, next){
    const { authorization } = req.headers;
    console.log(authorization)
    const token = authorization?.replace('Bearer ', '');
    console.log(token)
        if(!token) {
            return res.sendStatus(401);
        }
    console.log("vamos buscar o token nas sessoões")

    const session = await db.collection('sessions').findOne({ token });
    if (!session) {
    return res.sendStatus(401)
    }    
   
    res.locals.session = session;
    next();
}

export default validateUser;
