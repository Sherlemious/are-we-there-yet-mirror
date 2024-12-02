import { PromoCode } from '../models/promoCode.model';

class PromoCodeRepo {
  async getAllPromoCodes() {
    return await PromoCode.find();
  }

  async createPromoCode(promoCode: any) {
    return await PromoCode.create(promoCode);
  }

  async findPromoCodeById(id: string) {
    return await PromoCode.findById(id);
  }

  async deletePromoCode(id: string) {
    return await PromoCode.findByIdAndDelete(id);
  }
}

export default new PromoCodeRepo();
