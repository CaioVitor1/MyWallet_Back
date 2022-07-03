import express from 'express';
import cors from 'cors';
import { signUp, signIn } from './controllers/authController.js';
import {getCashFlux, postCashFlux} from './controllers/cashController.js'
//configurações express
const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', signUp)
app.post('/sign-in', signIn)

app.post('/cashFlux', postCashFlux)
app.get('/cashFlux', getCashFlux)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('API está no ar!');
  });