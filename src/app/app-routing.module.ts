import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./auth.guard";
import {SignUpComponent} from "./sign-up/sign-up.component";


const routes: Routes = [
  {path:'',component:AppComponent,canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  {path:'signup',component:SignUpComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
