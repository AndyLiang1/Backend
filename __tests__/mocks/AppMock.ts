import express, { Express, Request, Response } from 'express';
import { UserController } from '../../src/controllers/UserController'

export const app: Express = express();
app.use(express.json())

const apiRouter = express.Router();
app.use('/api', apiRouter);

const userController = new UserController();
userController.initRoutes(apiRouter);