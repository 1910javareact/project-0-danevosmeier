import { daoGetGardenByUsernameAndPassword, daoGetAllUsers } from "../repositories/user-dao";
import { User } from "../models/user";


export function getUserByUsernameAndPassword(username:string, password:string){
    //add functionality
    return daoGetGardenByUsernameAndPassword(username, password)
}

export function getAllUsers():User[]{
    //add functionality
    return daoGetAllUsers()
}