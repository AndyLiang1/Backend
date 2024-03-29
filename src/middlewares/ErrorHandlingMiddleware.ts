import { Request, Response, NextFunction } from 'express';
import { ProjectError } from '../errors/error';

const errorHandleMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ProjectError) {
        return res.status(err.statusCode).json(err.toString())}
    res.status(500).json({ error: err.toString() })
  }
  
export default errorHandleMiddleware