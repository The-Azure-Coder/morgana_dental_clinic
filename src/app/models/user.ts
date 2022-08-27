export class Users {
    _id: string;
    email: string;
    password: string;
    userRole: string;



    constructor(_id?: string, email?: string, password?: string, userRole?: string) {
        this._id = _id!;
        this.email = email!;
        this.password = password!;
        this.userRole = userRole!;
    }
}


