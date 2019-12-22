import { User } from '../models/user';
import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { userDTOtoUser, multiUserDTOtoUser } from '../util/userdto-to-user';


// checking if there is a user with a username and password that match the user's login input, 

export async function daoGetUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();

        const result = await client.query('SELECT * FROM project0.users NATURAL JOIN project0.users_roles NATURAL JOIN project0.roles WHERE username = $1 and password = $2',
            [username, password]);
        if (result.rowCount === 0) {
            throw 'Invalid Credentials';
        } else {
            return userDTOtoUser(result.rows);
        }
    } catch (e) {
        console.log(e);

        if (e === 'Invalid Credentials') {
            throw{
                status: 401,
                message: 'Invalid Credentials'
            };
        } else {            
            throw {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client && client.release();
    }
}

// here we are getting all users from the database

export async function daoGetUsers() {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();

        const result = await client.query('SELECT * FROM project0.users NATURAL JOIN project0.users_roles NATURAL JOIN project0.roles ORDER BY user_id');
        if (result.rowCount === 0) {
            throw 'No users in database';
        } else {
            return multiUserDTOtoUser(result.rows);
        }
    } catch (e) {
        if (e === 'No users in database') {
            throw{
                status: 400,
                message: 'No user found in database'
            };
        } else {
            throw{
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client && client.release();
    }
}

// getting a user from the database by Id
export async function daoGetUserById(id: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.users NATURAL JOIN project0.users_roles NATURAL JOIN project0.roles WHERE user_id = $1',
                                        [id]);
        if (result.rowCount === 0) {
            throw 'User does not exist';
        } else {

            return userDTOtoUser(result.rows);
        }
    } catch (e) {
        if (e === 'User does not exist') {
            throw{
                status: 404,
                message: 'Cannot find the user'
            };
        } else {
            throw{
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client && client.release();
    }
}

// updating a user in the database 

export async function daoUpdateUser(newUser: User) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        client.query('BEGIN');
        await client.query('update project0.users set username = $1, password = $2, firstname = $3, lastname = $4, email = $5 where user_id = $6',
            [newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email, newUser.userId]);
        await client.query('delete from project0.users_roles where user_id = $1',
            [newUser.userId]);
        for ( const role of newUser.roles) {
            await client.query('insert into project0.users_roles values ($1,$2)',
            [newUser.userId, role.roleId]);  
        }
        client.query('COMMIT');
    } catch (e) {
        client.query('ROLLBACK');
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}





// const result = await client.query('SELECT * FROM project0.users NATURAL JOIN project0.users_roles NATURAL JOIN project0.roles WHERE user_id = $1',
        //     [newUser.roles]);