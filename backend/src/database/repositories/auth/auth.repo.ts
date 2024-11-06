import { UserType } from '../../../types/User.types';
import { User } from '../../models/user.model';

class AuthRepo {
  async register(user: UserType) {
    const newUser = await User.create(user);
    return newUser;
  }

  async me(userId: String) {
    return await User.findById(userId).populate(['preferences', 'profile_pic', 'attachments']);
  }
}

export default new AuthRepo();
