import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Services } from 'src/app/models/services';
import { Observable, catchError, of } from 'rxjs';
import { APIResponse } from 'src/app/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private API_URL = 'http://localhost:3100/services';

  private _handleHttpErrors(retVal: any) {
    return (err: any) => {
      console.log(err);
      return of({ status: err.status, message: err.message, data: retVal });
    };
  }

  constructor(private http: HttpClient) { }

  getAllServices(): Observable<APIResponse<Services[]>> {
    return this.http
      .get<APIResponse<Services[]>>(this.API_URL)
      .pipe(catchError(this._handleHttpErrors([])));
  }

  getServicesById(id: string): Observable<APIResponse<Services>> {
    return this.http
      .get<APIResponse<Services>>(this.API_URL + '/' + id)
      .pipe(catchError(this._handleHttpErrors(new Services())));
  }

  createService(service: Partial<Services>): Observable<APIResponse<Services>> {
    return this.http
      .post<APIResponse<Services>>(this.API_URL, service)
      .pipe(catchError(this._handleHttpErrors(new Services())));
  }

  updateService(id: string, service: Services): Observable<APIResponse<Services>> {
    return this.http
      .put<APIResponse<Services>>(
        `${this.API_URL}/update/${id}`,
        service
      )
      .pipe(catchError(this._handleHttpErrors(new Services())));
  }

  deleteService(id: string): Observable<APIResponse<Services>> {
    return this.http
      .delete<APIResponse<Services>>(this.API_URL + '/' + id)
      .pipe(catchError(this._handleHttpErrors(new Services())));
  }

  getLimitedServices(
    page = 1,
    limit = 20
  ): Observable<APIResponse<Services[]>> {
    return this.http.get<APIResponse<Services[]>>(
      this.API_URL + '?_page=' + page + '&_limit=' + limit
    );
  }
}
