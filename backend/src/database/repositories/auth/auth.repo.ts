import { UserType } from '../../../types/User.types';
import { User } from '../../models/user.model';

class AuthRepo {
  async register(user: UserType) {
    const newUser = await User.create(user);
    return newUser.id;
  }
}

export default new AuthRepo();
