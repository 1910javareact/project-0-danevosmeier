import {User} from "./models/user"

export let users:User[] = [{
    userId: 1,
        username: "Finance Manager",
        password: "password",
        firstName: "",
        lastName: "",
        email: "",
    roles:{
        roleId: 1,
        role:"Finance Manager",
    }
},
{
    userId: 2,
        username: "Admin",
        password: "password",
        firstName: "",
        lastName: "",
        email: "",
    roles:{
        roleId: 2,
        role: "Admin"
    }
},
{
    userId: 3,
        username: "User1",
        password: "password",
        firstName: "",
        lastName: "",
        email: "",
    roles:{
        roleId: 3,
        role: "User"
    }
}]