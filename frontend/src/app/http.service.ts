import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {http_url as HTTP_URL} from './global';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Server Error';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Server error`;
    } else {
      // Server-side errors
      errorMessage = `Server Error`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getData(date1,date2){
    var body= new HttpParams();
    body=body.set('date1',date1);
    body=body.set('date2',date2);
    return this.httpClient.post<any>(HTTP_URL+'getData/',body).pipe(retry(3),catchError(this.handleError))
  }
  
  savedData(fname,lname,email,message){
    const headers = {'Content-Type': 'application/json'};
    var body = {"first_name":fname,"last_name":lname,"email":email,"message":message}
    return this.httpClient.post<any>(HTTP_URL+'saveData/',JSON.stringify(body),{'headers':headers}).pipe(retry(3),catchError(this.handleError))
  }

}