import express from 'express';
import bcrypt from 'bcryptjs';
import services from '../services/services';
import { IUser } from '../models/User';
import { ProjectError } from '../errors/error';
export class UserController {
    private router: express.Router;

    constructor() {
        this.router = express.Router();
        this.router.post('/signup', this.signup.bind(this));
        this.router.post('/login', this.login.bind(this));
    }

    public initRoutes(apiRouter: express.Router) {
        apiRouter.use('/auth', this.router);
    }

    private async signup(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const hashedPassword = bcrypt.hashSync(req.body.password);
            const userToCreate = {
                email: req.body.email as string,
                password: hashedPassword
            };
        
            await services.userService.signup(userToCreate as IUser);
            res.status(200).json('User created successfully!');
        } catch (err) {
            next(err)
        }
    }

    private async login(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const userData = req.body;
            const response = await services.userService.login(userData);
            res.status(200).json(response);
        } catch (err) {
            next(err)
        }
    }
}
