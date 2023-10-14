export default class UserDTO{
    constructor(user){
        this.user = user;
    }

    filter(){
        const userDTO = { 
            first_name: this.user.first_name,
            email: this.user.email,
            role: this.user.role
        }
        
        return userDTO;
    }
}