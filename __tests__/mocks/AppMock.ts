import express, { Express, Request, Response } from 'express';
import { UserController } from '../../src/controllers/UserController'
import { NoteController } from '../../src/controllers/NoteController'
import errorHandleMiddleware from "../../src/middlewares/ErrorHandlingMiddleware"

export const app: Express = express();
app.use(express.json())

const apiRouter = express.Router();
app.use('/api', apiRouter);

const userController = new UserController();
userController.initRoutes(apiRouter);

const noteController = new NoteController();
noteController.initRoutes(apiRouter)

app.use(errorHandleMiddleware)
