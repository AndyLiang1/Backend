import express from 'express';
import bcrypt from 'bcryptjs';
import services from '../services/services';
import { INote } from '../models/Note';
import authMiddleware from '../middlewares/AuthMiddleware';
export class NoteController {
    private router: express.Router;

    constructor() {
        this.router = express.Router();
        this.router.use(authMiddleware)
        this.router.get('/notes', this.getAll.bind(this));
        this.router.get('/notes/:id', this.getOne.bind(this));
        this.router.post('/notes', this.create.bind(this));
        this.router.put('/notes/:id', this.update.bind(this));
        this.router.delete('/notes/:id', this.delete.bind(this));
        this.router.post('/notes/:id/share', this.share.bind(this));
        this.router.get('/:id', this.search.bind(this));
    }

    public initRoutes(apiRouter: express.Router) {
        apiRouter.use('/', this.router);
    }

    private async getAll(req: any, res: express.Response, next: express.NextFunction) {
        try {
            const userId = req.userId
            const response = await services.noteService.getAll(userId)
            res.status(200).json(response);
        } catch (err) {
            next(err)
        }
    }

    private async getOne(req: any, res: express.Response, next: express.NextFunction) {
        try {
            const userId = req.userId
            const noteId = req.params.id
            const response = await services.noteService.getOne(userId, noteId)
            res.status(200).json(response);
        } catch (err) {
            next(err)
        }
    }
    
    private async create(req: any, res: express.Response, next: express.NextFunction) {
        try {
            const userId = req.userId
            const noteContents = req.body.message;
            const note: Partial<INote> = {
                message: noteContents,
                owner: userId,
            } 
            const response = await services.noteService.create(note);
            res.status(200).json(response);
        } catch (err) {
            next(err)
        }
    }
    private async update(req: any, res: express.Response, next: express.NextFunction) {
        try {
            const userId = req.userId
            const noteId = req.params.id
            const noteContents = req.body.message;
            const note: Partial<INote> = {
                message: noteContents,
                owner: userId
            } 
            const response = await services.noteService.update(userId, noteId, note);
            res.status(200).json(response);
        } catch (err) {
            next(err)
        }
    }
    private async delete(req: any, res: express.Response, next: express.NextFunction) {
        try {
            const userId = req.userId
            const noteId = req.params.id
            const response = services.noteService.delete(userId, noteId)
            res.status(200).json(response);
        } catch (err) {
            next(err)
        }
    }
    private async share(req: any, res: express.Response, next: express.NextFunction) {
        // not implemented, but the idea is to use the allowedId field in the notes, then this function becomes trivial 
    }
    private async search(req: any, res: express.Response, next: express.NextFunction) {
        // not implemented 
    }
}
