export interface PromoCodeType {
  _id?: string;
  code: string;
  discountPercentage: number;
  can_use_date?: Date;
  expiry_date?: Date;
  createdAt: Date;
  updatedAt: Date;
}
