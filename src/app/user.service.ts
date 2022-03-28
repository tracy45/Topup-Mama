import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UsersModel} from "./users--model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAll() {
    return this.http.get<UsersModel[]>('${config./api/users?page=2}/users');
  }

  signup(users: UsersModel) {
    return this.http.post('${config./api/register}/users/signup', users);

  }
  edit(users:UsersModel){
    return this.http.put('${config./api/users/2}/users/'+ users.id,users);
  }
  delete(id:number){
    return this.http.delete('${config./api/users/2}/users/'+id);
  }
  login(users:UsersModel){
    return this.http.post('${config./api/login}/user/login',users)
  }
  logout(){
    localStorage.removeItem('currentUser');
  }

}
