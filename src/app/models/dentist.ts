export class Dentists{
    _id:string;
    first_nm: string;
    last_nm: number;
    email: string;
    phoneNumber: string;
    docImg: string;
    docDescrip: string;


  
    
    
    constructor(_id?: string, first_nm?:string, last_nm?:number, email?:string, docImg?:string, docDescrip?: string, phoneNumber?:string){
      this._id = _id!;
      this.first_nm = first_nm!;
      this.last_nm = last_nm!;
      this.email = email!;
      this.phoneNumber = phoneNumber!;
      this.docImg = docImg!;
      this.docDescrip = docDescrip!;
    
    }
}