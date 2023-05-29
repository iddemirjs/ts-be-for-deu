import UserController from "../controller/UserController"
import { auth } from "../middleware/AuthMiddleware";
import BaseRoutes from "./BaseRouter";

class UserRouter extends BaseRoutes {
    routes(): void {
        this.router.put('/', auth, UserController.update);
    }
}

export default new UserRouter().router;
