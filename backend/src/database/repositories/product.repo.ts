import { ObjectId } from 'mongodb';
import Validator from '../../utils/Validator.utils';
import { Product } from '../models/product.model';

class ProductRepo {
  async findProductById(id: string) {
    Validator.validateId(id, 'Invalid product ID');
    return await Product.find({ _id: new ObjectId(id) });
  }

  async createProduct(product: any) {
    return await Product.create(product);
  }

  async updateProduct(id: string, details: string, price: number) {
    Validator.validateId(id, 'Invalid product ID');

    return await Product.updateOne({ _id: new ObjectId(id) }, { details, price });
  }

  async deleteProduct(id: string) {
    Validator.validateId(id, 'Invalid product ID');
    return await Product.deleteOne({ _id: new ObjectId(id) });
  }
}

export default new ProductRepo();
