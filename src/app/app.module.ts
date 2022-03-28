import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import { MyAccountComponent } from './my-account/my-account.component';
import {GooglePlaceModule} from "ngx-google-places-autocomplete";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { UsersComponent } from './users/users.component';
import { AlertComponent } from './alert/alert.component';
import {AuthGuard} from "./auth.guard";
import {AlertService} from "./alert.service";
import {AuthenticationServiceService} from "./authentication-service.service";
import {UserService} from "./user.service";
import {JWTInterceptor} from "./jwt.interceptor";
import {ErrorInterceptor} from "./error.interceptor";
import {MockendProvider} from "./mockend.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    MyAccountComponent,
    UsersComponent,
    AlertComponent

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,

    ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationServiceService,
    UserService,
    {provide: HTTP_INTERCEPTORS,useClass:JWTInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
    MockendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
