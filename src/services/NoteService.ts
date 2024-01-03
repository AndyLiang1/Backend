import { NoteRepo } from '../repositories/NoteRepo';
import { NoteModel, INote } from '../models/Note';

export class NoteService {
    constructor(private NoteRepo: NoteRepo) {}

    public async getAll(userId: string) {
        return await this.NoteRepo.getAll(userId)
    }

    public async getOne(userId: string, noteId: string) {
        return await this.NoteRepo.getOne(userId, noteId)
    }

    public async create(Note: Partial<INote>) {
        try {
            return await this.NoteRepo.create(Note);
        } catch(err) {
            throw err
        }
    }


    public async update(userId: string, noteId: string, updatedContent: Partial<INote>) {
        return await this.NoteRepo.update(userId, noteId, updatedContent)
    }

    public async delete(userId: string, noteId: string) {
        return await this.NoteRepo.delete(userId, noteId)
    }

    
}
