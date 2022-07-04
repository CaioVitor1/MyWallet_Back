import { Router } from 'express';
import { getCashFlux, postCashFlux, deleteCashFlux} from '../controllers/cashController.js'
import validateUser from '../middlewares/validateUser.js';

const cashRouter = Router();
cashRouter.get("/cashFlux", validateUser, getCashFlux);
cashRouter.post("/cashFlux", postCashFlux)
cashRouter.delete("/deletecash/:id", deleteCashFlux)
export default cashRouter;