import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Patients } from 'src/app/models/patient';
import { Observable, catchError, of } from 'rxjs';
import { APIResponse } from 'src/app/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private API_URL = "http://localhost:3100/patients";

  private _handleHttpErrors(retVal: any) {
    return (err: any) => {
      console.log(err);
      return of({status:err.status, message:err.message, data:retVal});
    }
  }

  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<APIResponse<Patients[]>>{
    return this.http.get<APIResponse<Patients[]>>(this.API_URL).pipe(catchError(this._handleHttpErrors([])));
  }

  getPatientById(id:string): Observable<APIResponse<Patients>>{
    return this.http.get<APIResponse<Patients>>(this.API_URL + '/' + id).pipe(catchError(this._handleHttpErrors(new Patients())));
  }

  createPatient(patient:Patients): Observable<APIResponse<Patients>>{
    return this.http.post<APIResponse<Patients>>(this.API_URL, patient).pipe(catchError(this._handleHttpErrors(new Patients())));
  }

  updatePatient(patient:Patients): Observable<APIResponse<Patients>>{
    return this.http.put<APIResponse<Patients>>(`${this.API_URL}/update/${patient._id}`, patient).pipe(catchError(this._handleHttpErrors(new Patients())));
  }

  deletePatient(id:string): Observable<APIResponse<Patients>>{
    return this.http.delete<APIResponse<Patients>>(this.API_URL + '/' + id).pipe(catchError(this._handleHttpErrors(new Patients())));
  }
  
}
