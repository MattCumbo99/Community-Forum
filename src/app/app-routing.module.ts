import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumHomeComponent } from './forum-home/forum-home.component';
import { ForumLoginComponent } from './forum-login/forum-login.component';
import { ForumRegisterComponent } from './forum-register/forum-register.component';
import { ForumMembersComponent } from './forum-members/forum-members.component';
import { ForumNotfoundComponent } from './forum-notfound/forum-notfound.component';
import { ForumProfileComponent } from './forum-profile/forum-profile.component';

const routes: Routes = [
  {path:"forums",redirectTo:"",pathMatch:"full"},
  {path:"members",component:ForumMembersComponent},
  {path:"members/:user",component:ForumProfileComponent},
  {path:"login",component:ForumLoginComponent},
  {path:"register",component:ForumRegisterComponent},
  {path:"",component:ForumHomeComponent},
  {path:"**",component:ForumNotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
