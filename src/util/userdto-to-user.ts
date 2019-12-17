import { UserDTO } from '../dtos/userdto';
import { User } from '../models/user';

export function userDTOtoUser(uD: UserDTO[]): User {
    return new User(
        uD[0].userid,
        uD[0].username,
        uD[0].password,
        uD[0].firstname,
        uD[0].lastname,
        uD[0].email,
        uD[0].role);
}

export function multiUserDTOConvertor(uD: UserDTO[]): User[] {
    let currentUser: UserDTO[] = [];
    const result: User[] = [];
    for (const u of uD) {
        if (currentUser.length === 0) {
            currentUser.push(u);
        } else if (currentUser[0].userid === u.userid) {
            currentUser.push(u);
        } else {
            result.push(userDTOtoUser(currentUser));
            currentUser = [];
            currentUser.push(u);
        }
    }
    result.push(userDTOtoUser(currentUser));
    return result;
}