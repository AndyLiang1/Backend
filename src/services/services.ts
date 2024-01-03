import {UserModel} from '../models/User';
import { UserRepo } from '../repositories/UserRepo';
import { UserService } from './UserService';

const userRepo = new UserRepo(UserModel)
const userService = new UserService(userRepo);

const services = {
    userService,
};

export default services