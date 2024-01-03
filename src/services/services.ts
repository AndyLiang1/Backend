import { NoteModel } from '../models/Note';
import { UserModel } from '../models/User';
import { NoteRepo } from '../repositories/NoteRepo';
import { UserRepo } from '../repositories/UserRepo';
import { NoteService } from './NoteService';
import { UserService } from './UserService';

const userRepo = new UserRepo(UserModel);
const userService = new UserService(userRepo);

const noteRepo = new NoteRepo(NoteModel);
const noteService = new NoteService(noteRepo);

const services = {
    userService,
    noteService
};

export default services;
