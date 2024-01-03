import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import services from './services/services';
import { IUser } from './models/User';
import { UserController } from './controllers/UserController';
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => {
    console.log('Connected to mongo');
    // const newUser = {
    //     email: 'user@example.com',
    //     password: 'password123',
    //   }
    // services.userService.create(newUser).then(() => {
    //     services.userService.getByEmail("user@example.com").then((user) => {
    //         console.log(user)
    //     })
    // })

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

    app.listen(port, () => {
        console.log(`Now listening on port ${port}`);
    });
};
