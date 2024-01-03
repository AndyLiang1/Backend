import express, {Express, Request, Response} from "express"
const port = 3000
const app: Express = express()

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!!!")
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`)
})