import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    const error = new Error('Unauthorized') as any;
    error.statusCode = 403;
    throw error;
  }
  const accessToken = authorizationHeader.substring('Bearer '.length);
  try {
    const parsedToken = jwt.verify(accessToken, config.server.jwtSecret) as any;

    if (parsedToken) {
      req.userId = parsedToken._id;
      return next();
    } else {
      console.log(parsedToken);
    }
  } catch (error) {
    (error as any).statusCode = 403;
    throw error;
  }
};

export default authMiddleware;
