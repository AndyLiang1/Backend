import express, {Express, Request, Response} from "express"
import mongoose from 'mongoose';

const port = 3000



mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => {
    console.log("Connected to mongo")
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




