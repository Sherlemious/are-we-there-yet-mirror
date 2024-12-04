import { AddressType } from '../../types/Address.types';
import { Address } from '../models/address.model';

class AddressRepo {
  async createAddress(address: AddressType) {
    const newAddress = await Address.create(address);
    return newAddress.id;
  }

  async getMyAddresses(user_id: string) {
    return Address.find({ user_id });
  }
}

export default new AddressRepo();
