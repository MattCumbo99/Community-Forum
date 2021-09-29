import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumHomeComponent } from './forum-home/forum-home.component';
import { ForumLoginComponent } from './forum-login/forum-login.component';
import { ForumRegisterComponent } from './forum-register/forum-register.component';

const routes: Routes = [
  {path:"forums",redirectTo:"",pathMatch:"full"},
  {path:"login",component:ForumLoginComponent},
  {path:"register",component:ForumRegisterComponent},
  {path:"",component:ForumHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
