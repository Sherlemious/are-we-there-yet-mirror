import { ObjectId } from 'mongodb';
import { ValidationException } from '../exceptions/ValidationException';

class Validator {
  static validateId(id: string, msg: string): boolean {
    if (!ObjectId.isValid(id)) {
      throw new ValidationException('Invalid itinerary ID');
    }

    return true;
  }
}

export default Validator;
