


export class Patients{
    _id:string;
    first_nm: string;
    last_nm: string;
    address: string;
    email: string;
    phoneNumber: string;
    age: string;
    dentistId: string;
    dob: string;
    regDate: string;
    appointDate: string;


    
    constructor(_id?: string, first_nm?:string, last_nm?:string, address?:string, regDate?:string,email?:string,phoneNumber?:string,dentistId?:string,age?:string,dob?:string,appointDate?:string,){
      this._id = _id!;
      this.first_nm = first_nm!;
      this.last_nm = last_nm!;
      this.email = email!;
      this.address = address!;
      this.phoneNumber = phoneNumber!;
      this.dentistId = dentistId!;
      this.dob = dob!;
      this.age = age!;
      this.regDate = regDate!;
      this.appointDate = appointDate!
    }
}

// const db = require("mongoose");


// let patientSchema = new db.Schema({
//   first_nm: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   last_nm: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   address: {
//     type: String,
//     trim: true,
//   },
//   email: {
//     type: String,
//     trim: true,
//   },

//   dob: {
//     type: Date,
//     required: true,
//   },
//   regDate: {
//     type: Date,
//     default: Date.now(),
//   },
//   appointDate: {
//     type: Date,
//     default: new Date(Date.now() + 12096e5),
//   },

// });

// module.exports = db.model("Patient", patientSchema);
