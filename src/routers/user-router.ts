import express from 'express';
import { User } from '../models/user';
import { getAllUsers, saveOneUser, getUserById, updateUser } from '../services/user-service';
// import { authorization } from '../middleware/auth-middleware';

export const userRouter = express.Router();

async function controllerGetUsers(req, res) {
    try {
        const user = await getAllUsers();
        res.json(user);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
}

userRouter.get('', //[authorization(1),
               controllerGetUsers);

userRouter.get('/:id', async (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) {
        res.sendStatus(400);
    } else {
        try {
            const user = await getUserById(id);
            res.json(user);
        } catch (e) {
            res.status(e.status).send(e.message);
        }

    }
});

userRouter.post('', //[authorization(1 || 2),
async (req, res) => {
    const { body } = req;
    const newU = new User(0, '', '', '', '', '', 0);
    for (const key in newU) {
        if (body[key] === undefined) {
            res.status(400).send('Please include all user fields');
            break;
        } else {
            newU[key] = body[key];
        }
    }
    try {
        const user = await saveOneUser(newU);
        res.status(201).json(user);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});

userRouter.patch('', //[authorization(1),
async (req, res) => {
    try {
        const {body} = req;
        const user = await updateUser(body);
        res.status(200).json(user);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});
