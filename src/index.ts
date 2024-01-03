import express, {Express, Request, Response} from "express"
import mongoose from 'mongoose';
import services from "./services/services"
import { IUser } from "./models/User";
const port = 3000



mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => {
    console.log("Connected to mongo")
    const newUser = {
        email: 'user@example.com',
        password: 'password123',
      }    
    services.userService.create(newUser).then(() => {
        services.userService.getByEmail("user1@gmail.com").then((user) => {
            console.log(user)
        })
    })
    

    startServer()
});

const startServer = (): void => {
    const app: Express = express()

    app.get("/", (req: Request, res: Response) => {
        res.send("Hello world!!!")
    })

    app.listen(port, () => {
        console.log(`Now listening on port ${port}`)
    })
}




