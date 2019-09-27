import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
//import { Http, Response, Request, Headers, RequestOptions, RequestMethod } from "@angular/http";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { ValidationError } from "../../errorHandler.service";
import { User } from "../../models/user.model";

const loginUrl = "/api/account/login";
const logoutUrl = "/api/account/logout";
const registerUrl = "/api/account/register";
const sessionUrl = "/api/session/";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  authenticated: boolean = false;

  email: string;
  name: string;
  password: string;

  callbackUrl: string;

  constructor(private http: HttpClient, private router: Router) { }

  login(): Observable<boolean> {
    this.authenticated = false;
    return this.loginStart(this.name, this.password)
      .pipe(map(response => {
        if (response == "ok") {
          this.authenticated = true;
          this.password = null;
          this.router.navigateByUrl(this.callbackUrl || "/admin/overview");
        }
        return this.authenticated;
      }),
      catchError(e => {
        this.authenticated = false;
        return of(false);
      }));
  }

  logout() {
    this.authenticated = false;
    this.logoutStart();
    this.router.navigateByUrl("/login");
  }

  register(user: User)
  {
    //if user is admin
    //this.callbackUrl = "/admin/overview";

    this.authenticated = false;
    return this.registerStart(user)
      .pipe(map(response => {
        alert("Reg R : " + response);
        if (response == "ok") {
          this.authenticated = true;
          //this.password = null; ?
          this.router.navigateByUrl(this.callbackUrl || "/admin/overview");
        }
        else 
        {
          this.authenticated = false;
          return response;//there are validation errors in response
        }
        return this.authenticated;
      }),
      catchError(e => {
        this.authenticated = false;
        return of(e);
      }));
  }

  //========Private methods =====================
  private registerStart(user: User)
  {
    let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: cpHeaders };
    return this.http.post(registerUrl, user, options);
  }

  private loginStart(login: string, pass: string) //: Observable<Response>
  {
    const body = { Name: login, Password: pass };
    return this.http.post(loginUrl, body);
  }

  private logoutStart() {
    this.http.post(logoutUrl, null);
  }

  //=====USER session  =======

  storeSessionData(dataType: string, data: any) {

    return this.http.post(sessionUrl + dataType, data).subscribe(response => { });
      //.pipe<T>(catchError(error => { return this.handleError(error, () => ...);

    //return this.sendRequest("Post", sessionUrl + dataType, data).subscribe(response => { });
  }

  getSessionData(dataType: string): Observable<any>
  {
    return this.http.get(sessionUrl + dataType).pipe(
      map(response => response,
        catchError((errorResponse: Response) => {
          if (errorResponse.status == 400) {
            let jsonData;
            try {
              jsonData = errorResponse.json();

            }
            catch (e) {
              throw new Error("Network Error");
            }
            let messages = Object.getOwnPropertyNames(jsonData)
              .map(p => jsonData[p]);
            throw new ValidationError(messages);
          }
          throw new Error("Network Error");
        })
      ));
    //return this.sendRequest("Get", sessionUrl + dataType);
  }

  /*
  private sendRequest(verb: string, url: string, data?: any): Observable<any>
  {

    return this.http.request(new HttpRequest({ method: verb, url: url, body: data, }))
      .pipe(map(response => { return response.headers.get("Content-Length") != "0" ? response.json() : null; }),

        catchError((errorResponse: Response) => {
          if (errorResponse.status == 400) {
            let jsonData;
            try {
              jsonData = errorResponse.json();

            }
            catch (e) {
              throw new Error("Network Error");
            }
            let messages = Object.getOwnPropertyNames(jsonData)
              .map(p => jsonData[p]);
            throw new ValidationError(messages);
          }
          throw new Error("Network Error");
        }));
  }*/
}
