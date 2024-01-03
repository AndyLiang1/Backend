import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserModel, IUser } from "../../src/models/User"
import { UserRepo } from '../../src/repositories/UserRepo'
import mongoose from 'mongoose';


describe('UserRepo test', () => {
    let mongod: MongoMemoryServer
    const userRepo: UserRepo = new UserRepo(UserModel)

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
        await UserModel.deleteMany({})
        console.log(`Deleted data from db.`)
    })

    test("Should add a user to the database", async () => {
        const testUser: Partial<IUser> = {
            email: "andy@gmail.com",
            password: "testing"
        }

        const createdUser = await userRepo.create(testUser)
        const fetchedUser = await UserModel.findOne({email: "andy@gmail.com"})

        expect(createdUser).toEqual(fetchedUser?.toObject())
    })

    test("Should return an existing user by email", async () => {
        const testUser: Partial<IUser> = {
            email: "andy@gmail.com",
            password: "testing"
        }

        const createdUser = await UserModel.create(testUser)
        const fetchedUser = await userRepo.getByEmail("andy@gmail.com")

        expect(fetchedUser).toEqual(createdUser.toObject())
    })

    
})