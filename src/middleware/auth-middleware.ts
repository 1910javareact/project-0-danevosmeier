export function authorization(authRoles: number) {
    return (req, res, next) => {
        let isAuth = false;
        if (!req.session.user) {
            res.status(401).send('Please Login');
            return;
        }
            if (authRoles == req.session.user.role) {
                isAuth = true;
            }
        if (isAuth) {
            next();
        } else {
            res.status(403).send('You are unauthorized for this endpoint');
        }
    };
    }