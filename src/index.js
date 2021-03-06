import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import cashRouter from './routes/userRouter.js';

//configurações express
const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter)
app.use(cashRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('API está no ar!');
  });