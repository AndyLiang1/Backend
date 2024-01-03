import {User, IUser} from '../models/User'

export class UserRepo {
    constructor (private model: typeof User) {

    }

    public async create(objectToCreate: Partial<IUser>) {
        const createdUserDocument = await this.model.create(objectToCreate)
        return createdUserDocument.toObject() as IUser
    }

    public async getByEmail(email: string) {
        return this.model.findOne({email}).lean()
    }
}