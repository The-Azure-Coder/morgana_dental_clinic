export class Services{
    _id:string;
    serviceName: string;
    serviceCost: number;
    serviceImg: string;
    serviceImg2: string;
    serviceDescrip: string;
  
    
    
    constructor(_id?: string, serviceName?:string, serviceCost?:number, serviceImg?:string, serviceImg2?:string, serviceDescrip?:string){
      this._id = _id!;
      this.serviceName = serviceName!;
      this.serviceCost = serviceCost!;
      this.serviceImg = serviceImg!;
      this.serviceImg2 = serviceImg2!;
      this.serviceDescrip = serviceDescrip!;
    
    }
    }


    