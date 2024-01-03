import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import bcrypt from 'bcryptjs';
import { IUser, UserModel } from '../../../src/models/User';
import { app } from '../../mocks/AppMock';
import { INote, NoteModel } from '../../../src/models/Note';
import jwt from 'jsonwebtoken';
import config from '../../../src/config/config';

const ENDPOINT = '/api/notes'

describe("/api/notes test", () => {
    let mongod: MongoMemoryServer
    let testUsers = [
        {
            email: "test@gmail.com",
            password: "testing"
        },
        {
            email: "test2@gmail.com",
            password: "hehehe"
        }
    ]
    
    let createdUsers: IUser[] = []
    
    
    beforeAll(async () => {
        mongod = await MongoMemoryServer.create()
        const mongoUri = mongod.getUri()
        await mongoose.connect(mongoUri)
        console.log(`Connected to ${mongoUri}`)
        
        for (let user of testUsers) {
            const hashedPassword = bcrypt.hashSync(user.password);
            const mockUser: Partial<IUser> = {
                email: user.email,
                password: hashedPassword,
            };
            let createdUser = await UserModel.create(mockUser)
            createdUsers.push(createdUser)
        }
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongod.stop()
        console.log(`Disconnected from db.`)
    })

    afterEach(async () => {
        await mongoose.connection.dropDatabase()
        console.log(`Deleted data from db.`)
    })

    test("Should return all notes owned by and shared with authenticated user", async () => {
        let notes: Partial<INote>[] = []
        const numNotes = getRandomInt(5, 20)

        for (let i = 0; i < numNotes; i++) {
            const owned = getRandomBoolean()
            let shared = getRandomBoolean()

            if (owned && shared) {
                shared = false
            }

            let note: Partial<INote> = {
                message: `message ${i}`
            }

            if (owned) {
                note.owner = createdUsers[0]._id
                notes.push(note)
            } else {
                note.owner = createdUsers[1]._id
                if (shared) {
                    note.allowedIds = [createdUsers[0]._id.toString()]
                    notes.push(note)
                }
            }

            await NoteModel.create(note)
        }
        const token = getAccessToken(createdUsers[0]._id)

        const res = await request(app)
            .get(ENDPOINT)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(res.body.length).toEqual(notes.length)
        for (let i = 0; i < notes.length; i++) {
            expect(res.body[i].message).toEqual(notes[i].message)
        }
    })

    test("Should prevent unauthorized users from retrieving notes", async () => {
        const res = await request(app)
            .get(ENDPOINT)
            .expect(403)
        expect(res.body).toEqual("Error: Unauthorized")
    })
})

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBoolean(): boolean {
    return Math.round(Math.random()) === 1;
}

function getRandomString(length: number): string {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
}

function getAccessToken(userId: string) {
    const token = jwt.sign(
        {
            userId
        },
        config.server.jwtSecret
    )
    return token
}