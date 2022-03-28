import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {delay, dematerialize, materialize, mergeMap, Observable, of, pipe, throwError} from 'rxjs';


@Injectable()
export class MockendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let users:any[] = JSON.parse(localStorage.getItem('users')) || [];
    return of(null).pipe(mergeMap(()=>{

//authentication of  users
      if(request.url.endsWith('/api/login') && request.method === 'POST') {
        let filteredUsers = users.filter(users => {
          return users.useremail === request.body.useremail && users.password === request.body.password;

        });
        if (filteredUsers.length) {
          let user = filteredUsers[0];
          let body = {
            id: user.id,
            useremail: user.useremail,
            token: 'jwt-token'
          };
          return of(new HttpRequest({status: 200, body: body}));
        } else {
          return throwError('Email or password is incorrect ');
        }
      }
      //get user
      if (request.url.endsWith('/api/users?=2') && request.method === 'GET') {
        if (request.headers.get('Authorization') === 'Bearer jwt-token') {
          return of(new HttpRequest({status: 200, body: users}));
        } else {
          return throwError('Unathorized');
        }
      }
      //register Users
      if (request.url.endsWith('api/register') && request.method === 'POST') {
        let newUsers = request.body;
        //validating new user
        let duplicateUser = users.filter(user => {
          return user.useremail === newUsers.useremail;
        }).length;
        if (duplicateUser) {
          return throwError('Useremail "' + newUsers.useremail + '"is already taken');
        }
        //save user registration

        newUsers.id = users.length + 1;
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        return of(new HttpRequest({status: 200}));
      }
      //Edit User

      if (request.url.match('/api/users/2') && request.method === 'PUT') {

      }

      //delete User

      if (request.url.match('/api/users/2') && request.method === 'DELETE') {
        if (request.headers.get('Authorization') === 'Bearer jwt-token') {
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (user.id === id) {
              users.splice(i, 1);
              localStorage.setItem('users', JSON.stringify(users));
              break;
            }
          }
          return of(new HttpRequest({status: 200}));
        } else {
          return throwError({status: 401, error: {message: 'Unauthorised'}});
        }
      }
   return next.handle(request);


    })
      //call materialize and dematerialize to ensure delay

       // @ts-ignore
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }

  }
  export let MockendProvider={
  provide:HTTP_INTERCEPTORS,
    useClass:MockendInterceptor,
    multi:true
};
