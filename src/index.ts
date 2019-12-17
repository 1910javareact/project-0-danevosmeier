import express from 'express';
import bodyparser from 'body-parser';
import { loggingMiddleware } from './middleware/logging-middleware';
import { sessionMiddleware } from './middleware/session-middleware';
import { userRouter } from './routers/user-router';
import { getUserByUsernameAndPassword } from './services/user-service';
import { reimRouter } from './routers/reim-router';
import { corsLocal } from './middleware/cors-middleware';

const app = express();

app.use(bodyparser.json());

app.use(corsLocal);

app.use(loggingMiddleware);

app.use(sessionMiddleware);

app.use('/users', userRouter);

app.use('/reimbursements', reimRouter);

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password ) {
        res.status(400).send('please have a username and password field');
    } else {
    try {
        const user = await getUserByUsernameAndPassword(username, password);
        req.session.user = user;
        res.json(user);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
}
});

app.listen(1910, () => {
    console.log('App has started');
});
