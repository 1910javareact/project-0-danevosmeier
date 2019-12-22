

export function authorization(roleIds: number[],userId?:boolean){
    
    return (req,res,next)=>{
        let isAuth = false

        //login check
        if(!req.session.user){
            res.status(401).send('Please Login')
            return;
        }

        
         for (const role of req.session.user.roles) {
            if(roleIds.includes(role.roleId)) {
                isAuth =true
            }
         }
        
        if(userId){
            let id = +req.params.userId
            if(!isNaN(id)){
                if(req.session.user.userId === id) {
                    isAuth = true
                }
            }
        }
        
        if(isAuth){
            next()
        }else{
            res.status(401).send('The incoming token has expired');
        }
    }
    
}
