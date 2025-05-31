export default class UserDTOCurrent{
    id;
    name;
    role;

    constructor(user){
        this.id = user.id; 
        this.name = user.name;
        this.role = user.role;
    }
}