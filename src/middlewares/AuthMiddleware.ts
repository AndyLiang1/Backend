import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { ProjectError } from '../errors/error';

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {

    throw new ProjectError({statusCode: 403, message: 'Unauthorized' });
  }

  const accessToken = authorizationHeader.substring('Bearer '.length);

  try {
    const parsedToken = jwt.verify(accessToken, config.server.jwtSecret) as any;

    if (parsedToken) {
      req.userId = parsedToken.userId;
      return next();
    } else {
      console.log(parsedToken);
    }
  } catch (error) {
    throw (error)
  }
};

export default authMiddleware;
