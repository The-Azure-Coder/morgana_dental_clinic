
export class Patients {
  _id: string;
  first_nm: string;
  last_nm: string;
  address: string;
  email: string;
  phoneNumber: string;
  age: string;
  dentistId: string | any;
  serviceId: string | any;
  dob: string;
  regDate: string;
  appointDate: string;



  constructor(_id?: string, first_nm?: string, last_nm?: string, address?: string, regDate?: string, email?: string, phoneNumber?: string,
    dentistId?: string, serviceId?: string, age?: string, dob?: string, appointDate?: string,) {
    this._id = _id!;
    this.first_nm = first_nm!;
    this.last_nm = last_nm!;
    this.email = email!;
    this.address = address!;
    this.phoneNumber = phoneNumber!;
    this.dentistId = dentistId!;
    this.serviceId = serviceId!;
    this.dob = dob!;
    this.age = age!;
    this.regDate = regDate!;
    this.appointDate = appointDate!
  }
}

