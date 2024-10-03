import { ObjectId } from 'mongodb';
import { Product } from '../models/product.model';
import Validator from '../../utils/Validator.utils';

class ProductRepo {
  async findProductById(id: string) {
    Validator.validateId(id, 'Invalid product ID');
    return await Product.find({ _id: new ObjectId(id) });
  }

  async createProduct(product: any) {
    const productRes = await Product.create(product);
    return productRes;
  }

  async updateProduct(id: string, product: any) {
    Validator.validateId(id, 'Invalid product ID');
    return await Product.updateOne({ _id: new ObjectId(id) }, product);
  }

  async deleteProduct(id: string) {
    Validator.validateId(id, 'Invalid product ID');
    return await Product.deleteOne({ _id: new ObjectId(id) });
  }

  async filterProductsByPrice(minPrice?: number, maxPrice?: number) {
    const query: any = {};

    if (minPrice !== undefined) {
      query.price = { ...query.price, $gte: minPrice };
    }
    if (maxPrice !== undefined) {
      query.price = { ...query.price, $lte: maxPrice };
    }

    return await Product.find(query);
  }
}

export default new ProductRepo();
