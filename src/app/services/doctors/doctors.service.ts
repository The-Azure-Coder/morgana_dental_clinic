import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Dentists } from 'src/app/models/dentist';
import { Observable, catchError, of } from 'rxjs';
import { APIResponse } from 'src/app/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class DentistsService {

  private API_URL = "http://localhost:3100/dentists";

  private _handleHttpErrors(retVal: any) {
    return (err: any) => {
      console.log(err);
      return of({status:err.status, message:err.message, data:retVal});
    }
  }

  constructor(private http: HttpClient) { }

  getAllDentists(): Observable<APIResponse<Dentists[]>>{
    return this.http.get<APIResponse<Dentists[]>>(this.API_URL).pipe(catchError(this._handleHttpErrors([])));
  }

  getDentistsById(id:string): Observable<APIResponse<Dentists>>{
    return this.http.get<APIResponse<Dentists>>(this.API_URL + '/' + id).pipe(catchError(this._handleHttpErrors(new Dentists())));
  }

  getDentistPatients(id:string): Observable<APIResponse<Dentists[]>>{
    return this.http.get<APIResponse<Dentists[]>>(`${this.API_URL}/${id}/patients`).pipe(catchError(this._handleHttpErrors(new Dentists())));
  }

  createDentist(dentist:Partial<Dentists>): Observable<APIResponse<Dentists>>{
    return this.http.post<APIResponse<Dentists>>(this.API_URL, dentist).pipe(catchError(this._handleHttpErrors(new Dentists())));
  }

  updateService(id:string,dentist:Dentists): Observable<APIResponse<Dentists>>{
    return this.http.put<APIResponse<Dentists>>(`${this.API_URL}/update/${id}`, dentist).pipe(catchError(this._handleHttpErrors(new Dentists())));
  }

  deleteDentist(id:string): Observable<APIResponse<Dentists>>{
    return this.http.delete<APIResponse<Dentists>>(this.API_URL + '/' + id).pipe(catchError(this._handleHttpErrors(new Dentists())));
  }



  getLimitedDentists(page= 1, limit = 20): Observable<APIResponse<Dentists[]>>{
    return this.http.get<APIResponse<Dentists[]>>(this.API_URL+"?_page="+page +"&_limit="+limit);
  }
  
}
