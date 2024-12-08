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

  async verifyPromoCode(code: string) {
    return await PromoCode.findOne({ code });
  }

  async findPromoCodeByCode(code: string) {
    return await PromoCode.findOne({ code });
  }
}

export default new PromoCodeRepo();
