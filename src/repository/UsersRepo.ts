import {Users} from "../models/Users";


interface IUsersRepo {
    save(users:Users):Promise<void>
    update(user:Users):Promise<void>
    delete(userId:number):Promise<void>
    getById(usersId:number):Promise<Users | null>
    getAll():Promise<Users[]>
    findByEmail(email:string): Promise<Users | null>
}

export class UserRepo implements IUsersRepo {
    async delete(userId: number): Promise<void> {
        try {
            const user = await Users.findOne({
                where: {
                    id: userId
                }
            });

            if (!user) {
                throw new Error("Bad Request!");
            }

            await user.destroy();
        } catch (e) {
            throw new Error("Failed to deleting user");
        }
    }

    async findByEmail(email: string): Promise<Users | null> {
        try {
            return await Users.findOne({
                where: {
                    email: email
                }
            });
        } catch (e) {
            throw new Error("Failed to finding user");
        }
    }

    async getAll(): Promise<Users[]> {
        try {
            return await Users.findAll();
        } catch (e) {
            throw new Error("Failed to fetch all user");
        }
    }

    async getById(usersId: number): Promise<Users | null> {
        try {
            const user = await Users.findOne({
                where: {
                    id: usersId
                }
            });

            return user;
        } catch (e) {
            throw new Error("Failed to deleting user");
        }
    }

    async save(users: Users): Promise<void> {
        try {
            await Users.create({
                name: users.name,
                username: users.username,
                password: users.password,
                email: users.email
            });
        } catch (e) {
            throw new Error("Failed to create user! ⚠️");
        }
    }

    async update(user: Users): Promise<void> {
        try {
            const newUser = await  Users.findOne({
                where: {
                    id: user.id
                }
            });

            if (!newUser) {
                throw new Error("User not found.");
            }

            newUser.name = user.name;
            newUser.username = user.username;
            newUser.email = user.email;
            newUser.password = user.password;

            await newUser.save();
        } catch (e) {
            throw new Error("Failed to updating user");
        }
    }
}
