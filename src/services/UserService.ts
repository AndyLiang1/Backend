import { UserRepo } from "../repositories/UserRepo";
import {UserModel, IUser} from '../models/User'
export class UserService {
    constructor(private userRepo: UserRepo) {

    }

    public async create(user: Partial<IUser>) {
        return this.userRepo.create(user)
    }

    public async getByEmail(email: string) {
        return this.userRepo.getByEmail(email)
    }
}