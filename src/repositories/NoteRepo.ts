import { ProjectError } from '../errors/error';
import { NoteModel, INote } from '../models/Note';
import mongoose from 'mongoose';
export class NoteRepo {
    constructor(private model: typeof NoteModel) {}

    public async create(objectToCreate: Partial<INote>) {
        const createdNoteDocument = await this.model.create(objectToCreate);
        return createdNoteDocument.toObject() as INote;
    }

    public async getAll(userId: string) {
        const notes: Partial<INote>[] = await this.model.find({
            $or: [
                { owner: new mongoose.Types.ObjectId(userId) },
                { allowedIds: new mongoose.Types.ObjectId(userId) }
            ]
        });
        notes.map((note) => delete note.owner);

        return notes;
    }

    public async getOne(userId: string, noteId: string) {
        let note: Partial<INote> | null = await this.model
            .findOne({
                _id: new mongoose.Types.ObjectId(noteId),
                $or: [
                    { owner: new mongoose.Types.ObjectId(userId) },
                    { allowedIds: new mongoose.Types.ObjectId(userId) }
                ]
            })
            .lean();
        if (!note)
            throw new ProjectError({
                statusCode: 404,
                message: 'Note not found'
            });

        delete note.owner;

        return note;
    }

    public async update(
        userId: string,
        noteId: string,
        updatedFields: Partial<INote>
    ) {
        const updatedNote: Partial<INote> | null = await this.model
            .findOneAndUpdate(
                {
                    _id: new mongoose.Types.ObjectId(noteId),
                    owner: new mongoose.Types.ObjectId(userId)
                },
                {
                    $set: {
                        message: updatedFields.message
                    }
                },
                { new: true }
            )
            .lean();
        if (!updatedNote)
            throw new ProjectError({
                statusCode: 404,
                message: 'Note not found'
            });
        delete updatedNote.owner;

        return updatedNote;
    }

    public async delete(userId: string, noteId: string) {
        await this.model.findOneAndDelete({
            _id: new mongoose.Types.ObjectId(noteId),
            owner: new mongoose.Types.ObjectId(userId)
        });
        return noteId
    }
}
