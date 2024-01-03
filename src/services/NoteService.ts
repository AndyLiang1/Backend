import { NoteRepo } from '../repositories/NoteRepo';
import { NoteModel, INote } from '../models/Note';

export class NoteService {
    constructor(private NoteRepo: NoteRepo) {}

    public async getAll(userId: string) {
        return this.NoteRepo.getAll(userId)
    }

    public async getOne(userId: string, noteId: string) {
        return this.NoteRepo.getOne(userId, noteId)
    }

    public async create(Note: Partial<INote>) {
        try {
            return this.NoteRepo.create(Note);
        } catch(err) {
            throw err
        }
    }


    public async update(userId: string, noteId: string, updatedContent: Partial<INote>) {
        return this.NoteRepo.update(userId, noteId, updatedContent)
    }

    public async delete(userId: string, noteId: string) {
        return this.NoteRepo.delete(userId, noteId)
    }

    
}
