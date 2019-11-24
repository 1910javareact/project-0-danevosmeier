import { UserDTO } from "../dto-models/user";
import { User } from "../models/user";


export function userDTOtoUser(users: UserDTO[]): User{
    let roles = []
    for(let user of users){
        roles.push({
            roleId: user.role_id,
            role: user.role_title
        })
    }
    return new User(
        users[0].user_id, 
        users[0].username, 
        users[0].password, 
        users[0].first_name, 
        users[0].last_name, 
        users[0].email, 
        roles)
}

export function multipleUserDTOtoUser(users: UserDTO[]): User[]{
    let currentUser: UserDTO[] = []
    let result: User[] = []
    for(let user of users){
        if(currentUser.length === 0){
            currentUser.push(user)
        }
        else if(currentUser[0].user_id === user.user_id){
            currentUser.push(user)
        }
        else{
            result.push(userDTOtoUser(currentUser))
            currentUser = []
            currentUser.push(user)
        }
    }
    result.push(userDTOtoUser(currentUser))
    return result
}