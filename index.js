import express from 'express';
import cors from 'cors';
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

//const token = uuid();
dotenv.config();

//configurações express
const app = express();
app.use(cors());
app.use(express.json());
//configurações mongodb
let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URI); 
const promise = mongoClient.connect();
promise.then(() => db = mongoClient.db("myWallet")); //conectando nosso sistema ao banco de dados chamado batePapoUol do Mongo


app.post('/sign-up', async (req, res) =>{
    try{
    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        repeatPassword: joi.valid(joi.ref('password')).required()
    })
    const validation = userSchema.validate(req.body)
    if(validation.error) {
        res.sendStatus(422);
        console.log("erro na validação")
        return; 
    } 
    
        const user = req.body; 
        const userExist = await db.collection('users').findOne({ email: user.email });
    if (userExist) {
      return res.sendStatus(409);
     
        }      
        const passwordHash = bcrypt.hashSync(user.password, 10);
        await db.collection('users').insertOne({ name: user.name, password: passwordHash, email: user.email}) 
        res.sendStatus(201);
        console.log("cadastramos")
    } catch(erro) {
        console.log("deu ruim")
        res.sendStatus(422)
    }
})
app.post('/sign-in', async(req, res) => {
    try {
     const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()    
    })
    const validation = loginSchema.validate(req.body)
    if(validation.error) {
        res.sendStatus(422);
        console.log("erro na validação")
        return; 
    }  
    
        const { email, password } = req.body;
        const user = await db.collection('users').findOne({ email });
       
    if (user && bcrypt.compareSync(password, user.password)) {
        console.log("A comparação deu ok")
        const token = uuid();
		await db.collection('sessions').insertOne({ token, userId: user._id })
    } else {
        res.sendStatus(400)
        return
    }
            
    res.sendStatus(201); 
    return

    } catch(erro) {
        console.log("deu ruim")
        res.sendStatus(422)
        return
    }
})


app.listen(5000, () => {
    console.log('API está no ar!');
  });