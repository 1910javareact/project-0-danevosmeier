import { users } from "../database"
import { User } from "../models/user"


export function daoGetGardenByUsernameAndPassword(username, password){
    for(let u of users){
        if(u.username === username && u.password === password){
            return u
        }
    }

    throw{
        status: 400,
        message: 'Invalid credentials'
    }
}

export function daoGetAllUsers():User[]{
    return users
}