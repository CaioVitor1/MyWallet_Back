import { Router } from 'express';
import { getCashFlux, postCashFlux} from '../controllers/cashController.js'
import validateUser from '../middlewares/validateUser.js';

const cashRouter = Router();
cashRouter.get("/cashFlux", validateUser, getCashFlux);
cashRouter.post("/cashFlux", postCashFlux)
export default cashRouter;