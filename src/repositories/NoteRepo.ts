import { NoteModel, INote } from '../models/Note';

export class NoteRepo {
    constructor(private model: typeof NoteModel) {}

    public async create(objectToCreate: Partial<INote>) {
        const createdNoteDocument = await this.model.create(objectToCreate);
        return createdNoteDocument.toObject() as INote;
    }

    public async getAll(userId: string) {
        return this.model
            .find({
                $or: [{ owner: userId }, { allowedIds: userId }]
            })
            .lean();
    }

    public async getOne(userId: string, noteId: string) {
        return this.model
            .findOne({
                _id: noteId,
                $or: [{ owner: userId }, { allowedIds: userId }]
            })
            .lean();
    }

    public async update(userId: string, noteId: string, updatedFields: Partial<INote>) {
        const updatedNote = await this.model.findOneAndUpdate(
            { _id: noteId, owner: userId },
            {
                $set: {
                    message: updatedFields
                }
            },
            { new: true }
        ).lean();
        return updatedNote;
    }

    public async delete(userId: string, noteId: string) {
        return this.model.findOneAndDelete({ _id: noteId, owner: userId });
    }
}
