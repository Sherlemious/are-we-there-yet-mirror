import { ObjectId } from 'mongodb';
import { ValidationException } from '../exceptions/ValidationException';

class Validator {
  static validateId(id: string, msg: string): boolean {
    if (!ObjectId.isValid(id)) {
      throw new ValidationException(msg);
    }

    return true;
  }
}

export default Validator;
