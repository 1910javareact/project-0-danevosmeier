import * as userDao from "../repositories/user-dao";
import { User } from "../models/user";


export async function getUserByUsernameAndPassword(username:string, password:string):Promise<User>{
    try{
        return await userDao.daoGetUserByUsernameAndPassword(username, password)
    }
    catch(e){
        throw e
    }
}

export async function getAllUsers():Promise<User[]>{
    try{
        return await userDao.daoGetAllUsers()
    }
    catch(e){
        throw e
    }
}

export async function getUserById(id: number):Promise<User>{
    try{
        return await userDao.daoGetUserById(id)
    }
    catch(e){
        throw e
    }
}

export async function updateUser(user: User):Promise<User>{
    try{
        let updateUser = await userDao.daoGetUserById(user.userId)

        for(let key in updateUser){
            if(user[key] !== updateUser.hasOwnProperty(key)){
                updateUser[key] = user[key]
            }
        }
        return await userDao.daoUpdateUser(user)
    }
    catch(e){
        throw e
    }
}