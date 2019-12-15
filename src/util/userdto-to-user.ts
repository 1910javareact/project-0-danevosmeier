import { UserDTO } from "../dto-models/user";
import { User } from "../models/user";


export function userDTOtoUser(uD: UserDTO[]): User{
    
    let role = []
    return new User(
        uD[0].user_id, 
        uD[0].username, 
        uD[0].password, 
        uD[0].first_name, 
        uD[0].last_name, 
        uD[0].email, 
        role)
}

export function multipleUserDTOtoUser(uD: UserDTO[]): User[]{
    let currentUser: UserDTO[] = []
    let result: User[] = []
    for(let user of uD){
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