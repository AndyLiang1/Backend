import express from "express";
import bcrypt from "bcryptjs";
import services from "../services/services"
export class UserController {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.post("/signup", this.signUp.bind(this));
    this.router.post("/login", this.login.bind(this));
  }

  public initRoutes(apiRouter: express.Router) {
    apiRouter.use("/users", this.router);
  }

  private async signUp(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // try {
    //     console.log('here')
    // //   const hashedPassword = bcrypt.hashSync(req.body.password);
    // //   const userToCreate = {
    // //     email: req.body.email as string,
    // //     password: hashedPassword,
    // //   };
    // const userToCreate = {
    //     email: 'user@example.com',
    //     password: 'password123',
    // } 
    //   const createdUser = await services.userService.create(userToCreate);
    //   res.json(createdUser);
    // } catch (err) {
    //   next(err);
    // }
    res.json("hai")
  }

  private async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
    //   const user = await req.services.userService.getByEmail(req.body.email);
    //   if (user) {
    //     const passwordMatches = bcrypt.compareSync(
    //       req.body.password,
    //       user.password
    //     );
    //     if (passwordMatches) {
    //       return res.sendStatus(200);
    //     }
    //   }
    //   res.sendStatus(400);
    } catch (err) {
      next(err);
    }
  }
}