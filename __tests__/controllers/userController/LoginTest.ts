import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import bcrypt from 'bcryptjs';
import { IUser, UserModel } from '../../../src/models/User';
import { app } from '../../mocks/AppMock';
import jwt from 'jsonwebtoken';
import config from '../../../src/config/config';

const ENDPOINT = '/api/auth/login'


describe("'/api/auth/login test", () => {
    let mongod: MongoMemoryServer
    const testUser = {
        email: "test@gmail.com",
        password: "testing"
    }
    let createdUser: IUser

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create()
        const mongoUri = mongod.getUri()
        await mongoose.connect(mongoUri)
        console.log(`Connected to ${mongoUri}`)

        const hashedPassword = bcrypt.hashSync(testUser.password);
        
        const mockUser: Partial<IUser> = {
            email: testUser.email,
            password: hashedPassword,
        };
        createdUser = await UserModel.create(mockUser)
        
    })

    afterAll(async () => {
        await mongoose.connection.dropDatabase()
        await mongoose.disconnect()
        await mongod.stop()
        console.log(`Deleted data and disconnected from db.`)
    })

    test("Should login successfully with correct credentials", async () => {
        const res = await request(app)
            .post(ENDPOINT)
            .send(testUser)
            .expect(200)
        
        const token = jwt.sign(
            {
                userId: createdUser._id
            },
            config.server.jwtSecret
        )

        expect(res.body).toEqual(token)
    })
    
    test("Should return 404 for incorrect email", async () => {
        const res = await request(app)
            .post(ENDPOINT)
            .send({
                email: "bla@test.com",
                password: testUser.password
            })
            .expect(404)
        expect(res.body).toEqual("Error: Invalid login")
    })

    test("Should return 401 for incorrect password", async () => {
        const res = await request(app)
            .post(ENDPOINT)
            .send({
                email: testUser.email,
                password: "wrongpassword"
            })
            .expect(401)
        expect(res.body).toEqual("Error: Invalid login")
    })

    test("Should return 400 for empty request", async () => {
        const res = await request(app)
            .post(ENDPOINT)
            .send({})
            .expect(404)
        expect(res.body).toEqual("Error: Invalid login")
    })
})
