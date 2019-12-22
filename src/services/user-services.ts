import { User } from "../models/user";
import { daoGetUserByUsernameAndPassword, daoGetUsers, daoGetUserById, daoUpdateUser } from "../repositories/user-dao";


export function getUserByUsernameAndPassword(username:string, password:string):Promise<User>{
    try {
        return daoGetUserByUsernameAndPassword(username, password);
    } catch (e) {
       
        
        throw e;
    }
}



export function getUsers():Promise<User[]> {
    try {
        return daoGetUsers();
    } catch (e) {
        throw e;
    }
}

export function getUserById(id:number):Promise<User> {
    try {
        return daoGetUserById(id);
    } catch (e) {
        throw e;
    }

}
export async function updateUser(req: User) {
    try {
        const user = await daoGetUserById(req.userId);
        for (const key in req) {
            if (req[key] !== undefined && user.hasOwnProperty(key)) {
                // hasOwnProperty returns true 
                user[key] = req[key];
            }
        }
       
        await daoUpdateUser(user);
        
        return user;
    } catch (e) {
        throw e;
    }
}