import {UserRepo} from "../repository/UsersRepo";
import Authentication from "../utils/Authentication";
import {Users} from "../models/Users";

interface IAuthenticationService {
    login(email: string, password:string): Promise<string>,
    register(email: string, password: string, name: string, username: string): Promise<void>
}

export class AuthenticationService implements IAuthenticationService{
    async login(email: string, password: string): Promise<string> {
        const users = await new UserRepo().findByEmail(email);

        if (!users) {
            throw new Error("Bad Request User not found");
        }
        let compare = await Authentication.passwordCompare(password, users.password);

        if (compare) {
            return Authentication.generateToken(users.id, users.email, users.name, users.username);
        }
        return "";
    }

    async register(email: string, password: string, name: string, username: string): Promise<void> {

        try {
            const userCheck = await new UserRepo().findByEmail(email);

            if (userCheck) {
                throw new Error("User already created.");
            }
        } catch (e) {
            throw new Error("User already created.");
        }

        try {

            const hashedPassword: string = await Authentication.passwordHash(password);
            const newUser: Users = new Users();
            newUser.email = email;
            newUser.username = username;
            newUser.name = name;
            newUser.password = hashedPassword;

            await new UserRepo().save(newUser);
        } catch (e) {
            throw new Error("Error login B042");
        }
    }

}
