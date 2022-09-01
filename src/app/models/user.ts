export class Users {
    _id: string;
    email: string;
    password: string;
    role: string;
    username: string;



    constructor(_id?: string, email?: string, password?: string, role?: string, username?: string) {
        this._id = _id!;
        this.email = email!;
        this.password = password!;
        this.role = role!;
        this.username = username!;
    }
}


