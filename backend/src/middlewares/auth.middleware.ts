import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log(token);
  if (!token) {
    res.status(401).send('Access Denied');
    return;
  }

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any) => {
    if (err) {
      res.status(403).send('Invalid Token');
      return;
    }

    next();
  });
};

export { authenticateToken };
