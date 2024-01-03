import { UserRepo } from '../repositories/UserRepo';
import { UserModel, IUser } from '../models/User';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ProjectError } from '../errors/error';

export class UserService {
    constructor(private userRepo: UserRepo) {}

    public async signup(user: IUser) {
        try {
            const userWithEmail = await this.getByEmail(user.email);
            if (userWithEmail) {
                throw new ProjectError({statusCode: 409, message: 'Email exists already' });
            }
            return this.create(user);
        } catch(err) {
            throw err
        }
    }

    public async login(user: IUser) {
        try {
            const userWithEmail = await this.getByEmail(user.email);
            if (userWithEmail == null) {
                throw new ProjectError({statusCode: 404, message: 'Invalid login' });
            }

            const passwordMatches = bcrypt.compareSync(user.password, userWithEmail.password);

            if (!passwordMatches) {
                throw new ProjectError({statusCode: 401, message: 'Invalid login' });

            }
            const accessToken = this.createAccessToken(userWithEmail)

            return accessToken
        } catch(err) {
            throw err
        }
        
    }

    private async create(user: Partial<IUser>) {
        return this.userRepo.create(user);
    }

    private createAccessToken(userData: Partial<IUser>) {
        try {
            const accessToken = jwt.sign(
                {
                    userId: userData._id
                },
                config.server.jwtSecret
            );
            return accessToken;
        } catch (error) {
            throw new ProjectError({statusCode: 400, message: `Could not create token: ${error}`});
        }
    }

    public async getByEmail(email: string) {
        return this.userRepo.getByEmail(email);
    }
}
