import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { APIResponse } from 'src/app/models/api-response';
import { Users } from 'src/app/models/user';
import { AUTHResponse } from 'src/app/models/auth-respose';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = `${environment.API_SERVER}/services`;

  private _handleHttpErrors(retVal: any) {
    return (err: any) => {
      console.log(err);
      return of({ status: err.status, message: err.message, data: retVal });
    };
  }

  private _handleAuthErrors(retVal: any) {
    return (err: any) => {
      console.log(err);
      return of({ status: err.status, loginUser: err.loginUser, data: retVal, response: err.response, auth: err.auth });
    };
  }

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<APIResponse<Users[]>> {
    return this.http
      .get<APIResponse<Users[]>>(this.API_URL)
      .pipe(catchError(this._handleHttpErrors([])));
  }

  getUserById(id: string): Observable<APIResponse<Users>> {
    return this.http
      .get<APIResponse<Users>>(this.API_URL + '/' + id)
      .pipe(catchError(this._handleHttpErrors(new Users())));
  }

  loginUser(user: Partial<Users>): Observable<AUTHResponse<Users>> {
    return this.http
      .post<AUTHResponse<Users>>(`${this.API_URL}/login`, user)
      .pipe(catchError(this._handleAuthErrors(new Users())));
  }

  RegisterUser(user: Partial<Users>): Observable<AUTHResponse<Users>> {
    return this.http
      .post<AUTHResponse<Users>>(`${this.API_URL}/register`, user)
      .pipe(catchError(this._handleAuthErrors(new Users())));
  }

  updateUser(id: string, user: Users): Observable<APIResponse<Users>> {
    return this.http
      .put<APIResponse<Users>>(
        `${this.API_URL}/update/${id}`,
        user
      )
      .pipe(catchError(this._handleHttpErrors(new Users())));
  }

  deleteUser(id: string): Observable<APIResponse<Users>> {
    return this.http
      .delete<APIResponse<Users>>(this.API_URL + '/' + id)
      .pipe(catchError(this._handleHttpErrors(new Users())));
  }


}
