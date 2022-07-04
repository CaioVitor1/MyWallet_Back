import { db } from '../dbStrategy/mongo.js';
import joi from 'joi';

export async function getCashFlux(req, res) {
    try {
        const session = res.locals.session;
        console.log(session)
        // eu preciso retornar apenas os objetos do cashFlux que pertencerem ao email do usuário
        const user = await db.collection('users').findOne({ _id: session.userId });
        console.log(user)
        if (!user) {
            return res.sendStatus(401);
        }
        const flux = await db.collection('cashFlux').find({email: user.email}).toArray();
        res.status(201).send(flux); 
        return
        } 
    catch(erro) {
        console.log(erro)
        console.log("deu ruim")
        res.sendStatus(422)
        return
    }
}

export async function postCashFlux(req, res) {
    try{
        const cashSchema = joi.object({
            value: joi.number().required(),
            description: joi.string().required(),
            type: joi.string().required(),
            email: joi.string().email().required(),
            time: joi.string().required()
        })
        const validation = cashSchema.validate(req.body)
        if(validation.error) {
        res.sendStatus(422);
        console.log("erro na validação")
        return; 
        }
        await db.collection('cashFlux').insertOne(req.body) 
        res.sendStatus(201);  
        return

    }catch(erro) {
        console.log("deu ruim")
        res.sendStatus(422)
        return
    }
}

export async function deleteCashFlux(req,res) {
    try {
        const { id } = req.params;
        const userEmail = req.headers.email;

        const cashCollection = mongoClient.collection('cashFlux');

        const existingCash = await cashCollection.findOne({_id: id})
    if (!existingCash) {
        console.log("Não achamos nenhum item")
      return res.sendStatus(409);
    }

    if (existingCash.email !== userEmail) {
      return res.sendStatus(401);
    }

    await cashCollection.deleteOne({
      _id: existingCash._id
    }) 

    } catch(erro) {
        console.log("deu ruim")
        res.sendStatus(422)
        return
    }
}