import { Document, model, Schema, Types } from 'mongoose';

const NoteSchema = new Schema(
    {
        message: String, 
        allowedIds: [String],
        owner: {
            type: Types.ObjectId,
            ref: 'User' 
        }
    },
    {
        timestamps: true
    }
);

export interface INote extends Document {
    message: String, 
    allowedIds: string[],
    owner: Types.ObjectId
}

export const NoteModel = model<INote>('Note', NoteSchema);
