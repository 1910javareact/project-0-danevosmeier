import { UserDTO } from '../dtos/user-dto';
import { User } from '../models/user';

//turning into one user
export function userDTOtoUser(users: UserDTO[]): User {
    const roles = [];
    for (const user of users) {
        roles.push({
            roleId: user.role_id,
            role: user.role_title
        });
    }
    return new User(users[0].user_id, 
        users[0].username, 
        users[0].password, 
        users[0].firstname, 
        users[0].lastname, 
        users[0].email, 
        roles);
}


// turning into multiple users
export function multiUserDTOtoUser(users: UserDTO[]): User[] {
    let currentUser: UserDTO[] = [];
    const result: User[] = [];
    for (const user of users) {
        if (currentUser.length === 0) {
            currentUser.push(user);
        } else if (currentUser[0].user_id === user.user_id) {
            currentUser.push(user);
        } else {
            result.push(userDTOtoUser(currentUser));
            currentUser = [];
            currentUser.push(user);
        }
    }
    result.push(userDTOtoUser(currentUser));
    return result;
}
