

export function authorization(roleIds: number[], userId?:boolean){

    return (req, res, next)=>{
        let isAuth = false

        if(!req.session.user){
            res.status(401).send('Please Login')
            return
        }
        if(roleIds.includes(req.session.user.role.roleId)){
                isAuth = true
        }
        
        if(userId){
            let id = +req.params.id
            if(!isNaN(id)){
                if(req.session.user.userId === id){
                    isAuth = true
                }
            }
        }

        if(isAuth){
            next()
        }
        else{
            res.status(401).send(`The incoming token has expired`)
        }
    }
}