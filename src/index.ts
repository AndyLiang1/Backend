import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import services from './services/services';
import { IUser } from './models/User';
import { UserController } from './controllers/UserController';
import errorHandleMiddleware from "./middlewares/ErrorHandlingMiddleware"
import { NoteController } from './controllers/NoteController';
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => {
    console.log('Connected to mongo');
    startServer();
});

const startServer = (): void => {
    const app: Express = express();
    app.use(express.json())

    app.get('/', (req: Request, res: Response) => {
        res.send('Hello world!!!');
    });

    const apiRouter = express.Router();
    app.use('/api', apiRouter);

    const userController = new UserController();
    userController.initRoutes(apiRouter);
    const noteController = new NoteController();
    noteController.initRoutes(apiRouter);

    app.use(errorHandleMiddleware)

    app.listen(port, () => {
        console.log(`Now listening on port ${port}`);
    });
};
