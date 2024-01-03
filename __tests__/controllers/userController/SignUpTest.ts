import express from 'express';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import bcrypt from 'bcryptjs';
import { UserController } from '../../../src/controllers/UserController';
import services from '../../../src/services/services';
import { IUser, UserModel } from '../../../src/models/User';
import { app } from '../../mocks/AppMock';

const ENDPOINT = '/api/auth/signup'

describe('api/auth/signup test', () => {
    let mongod: MongoMemoryServer

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create()
        const mongoUri = mongod.getUri()
        await mongoose.connect(mongoUri)
        console.log(`Connected to ${mongoUri}`)
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

    test("Should sign up a new user", async () => {
        const testUser = {
            email: "andy@gmail.com",
            password: "testing"
        }

        const res = await request(app)
            .post(ENDPOINT)
            .send(testUser)
            .expect(200)

        console.log(`body test ${res.body}`)
        const fetchedUser = await UserModel.findOne({email: testUser.email})
        
        expect(fetchedUser?.email).toEqual(testUser.email)
        expect(bcrypt.compareSync(testUser.password, fetchedUser?.password as string))
        
        expect(res.body).toEqual("User created successfully!")
    })

    test("Should prevent users from signing up duplicated emails", async () => {
        const testUser1 = {
            email: "andy@gmail.com",
            password: "testing"
        }

        let res = await request(app)
            .post(ENDPOINT)
            .send(testUser1)
            .expect(200)

        expect(res.body).toEqual("User created successfully!")

        const testUser2 = {
            email: testUser1.email,
            password: "blablabla"
        }

        res = await request(app)
            .post(ENDPOINT)
            .send(testUser2)
            .expect(409)
        expect(res.body).toBe("Error: Email already exists.")
        
    })
})