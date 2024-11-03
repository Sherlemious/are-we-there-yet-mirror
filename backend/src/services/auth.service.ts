import jwt from 'jsonwebtoken';

class AuthService {
  public generateAccessToken(user: any) {
    return jwt.sign(user, process.env.TOKEN_SECRET as string, { expiresIn: '30d' });
  }
}

export default new AuthService();
