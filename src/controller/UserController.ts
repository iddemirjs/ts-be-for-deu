import { Request, Response} from "express";
import {Users} from "../models/Users";
import {UserRepo} from "../repository/UsersRepo";
import Authentication from "../utils/Authentication";

class User {
    async update(req: Request, res: Response) {
        try {
            const userInstance = new Users(req.body);
            const sessionUser = req.app.locals.credential;
            const targetUser = await new UserRepo().getById(sessionUser.userId);
            if (!targetUser){
                return res.status(500).json({
                    success: false,
                    message: "Your session may be expired"
                });
            }

            userInstance.id = sessionUser.userId;
            userInstance.username = userInstance.username ? userInstance.username : targetUser!.username;
            userInstance.name = userInstance.name ? userInstance.name : targetUser!.name;
            userInstance.email = userInstance.email ? userInstance.email :targetUser!.email;
            userInstance.password = userInstance.password ? await Authentication.passwordHash(userInstance.password) : targetUser!.password;
            await new UserRepo().update(userInstance);

            return res.status(200).json({
                status: "OK",
                message: "Update is successfully.",
                result: {
                    username: userInstance.username,
                    name: userInstance.name,
                    email: userInstance.email
                }
            });
        }catch (e) {
            throw new Error("User not edited.");
        }
    }
}
export default new User();
