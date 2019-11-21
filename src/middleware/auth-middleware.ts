

export function authorization(authRoles:string[]){

    return (req, res, next)=>{
        let isAuth = false

        if(!req.session.user){
            res.status(401).send('Please Login')
            return
        }
        for(let userRole of req.session.user.roles){
            if(authRoles.includes(userRole)){
                isAuth = true
            }
        }
        if(isAuth){
            next()
        }
        else{
            res.status(403).send(`You are not authorized for this page`)
        }
    }
}