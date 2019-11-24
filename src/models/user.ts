export class User{
    userId: number // primary key
	username: string // not null, unique
	password: string // not null
	firstName: string // not null
	lastName: string // not null
	email: string // not null
    roles: Role[] // not null
    
    constructor(userId: number, userName: string, password: string,
        firstName: string, lastName: string, email: string, roles: Role[]){
            this.userId = userId
            this.username = userName
            this.password = password
            this.firstName = firstName
            this.lastName = lastName
            this.email = email
            this.roles = roles
        }
}

export class Role{
    roleId: number
    role: string

    constructor(roleId: number, role: string){
        this.roleId = roleId
        this.role = role
    }
}