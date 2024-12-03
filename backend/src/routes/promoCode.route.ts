import { Router } from 'express';
import PromoCodeController from '../controllers/promoCode.controller';

const promoCodeRouter = Router();

promoCodeRouter.post('/', PromoCodeController.createPromoCode);
promoCodeRouter.get('/', PromoCodeController.getAllPromoCodes);
promoCodeRouter.get('/:id', PromoCodeController.getPromoCodeById);
promoCodeRouter.delete('/:id', PromoCodeController.deletePromoCode);
promoCodeRouter.patch('/:id', PromoCodeController.updatePromoCode);

export default promoCodeRouter;
