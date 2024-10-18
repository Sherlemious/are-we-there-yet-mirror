import jwt from 'jsonwebtoken';

class AuthService {
  public generateAccessToken(user: any) {
    return jwt.sign(user, process.env.TOKEN_SECRET as string, { expiresIn: '2h' });
  }
}

export default new AuthService();
