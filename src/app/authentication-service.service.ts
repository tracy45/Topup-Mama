import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private http:HttpClient) { }

  login(email:string, password:string){
    return this.http.post<any>('${config./api/login}/users/authenticate',{email,password})
      .pipe(map(user=>{
        if (user){
          user.authdata= window.btoa(email+ ':' +password);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;

      }));
  }
  logout(){
    localStorage.removeItem('currentUser');
  }
}
