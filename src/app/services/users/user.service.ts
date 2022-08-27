import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { APIResponse } from 'src/app/models/api-response';
import { Users } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:3100/users';

  private _handleHttpErrors(retVal: any) {
    return (err: any) => {
      console.log(err);
      return of({ status: err.status, message: err.message, data: retVal });
    };
  }

  constructor(private http: HttpClient) { }

  getAllServices(): Observable<APIResponse<Users[]>> {
    return this.http
      .get<APIResponse<Users[]>>(this.API_URL)
      .pipe(catchError(this._handleHttpErrors([])));
  }

  getUserById(id: string): Observable<APIResponse<Users>> {
    return this.http
      .get<APIResponse<Users>>(this.API_URL + '/' + id)
      .pipe(catchError(this._handleHttpErrors(new Users())));
  }

  createUser(service: Partial<Users>): Observable<APIResponse<Users>> {
    return this.http
      .post<APIResponse<Users>>(this.API_URL, service)
      .pipe(catchError(this._handleHttpErrors(new Users())));
  }

  updateUser(id: string, service: Users): Observable<APIResponse<Users>> {
    return this.http
      .put<APIResponse<Users>>(
        `${this.API_URL}/update/${id}`,
        service
      )
      .pipe(catchError(this._handleHttpErrors(new Users())));
  }

  deleteUser(id: string): Observable<APIResponse<Users>> {
    return this.http
      .delete<APIResponse<Users>>(this.API_URL + '/' + id)
      .pipe(catchError(this._handleHttpErrors(new Users())));
  }


}
