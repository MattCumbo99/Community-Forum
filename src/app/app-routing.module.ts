import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumHomeComponent } from './forum-home/forum-home.component';
import { ForumLoginComponent } from './forum-login/forum-login.component';
import { ForumRegisterComponent } from './forum-register/forum-register.component';
import { ForumMembersComponent } from './forum-members/forum-members.component';
import { ForumNotfoundComponent } from './forum-notfound/forum-notfound.component';
import { ForumProfileComponent } from './forum-profile/forum-profile.component';
import { ForumBansComponent } from './forum-bans/forum-bans.component';
import { ForumEditprofileComponent } from './forum-editprofile/forum-editprofile.component';
import { ForumAdminpanelComponent } from './forum-adminpanel/forum-adminpanel.component';

const routes: Routes = [
  {path:"forums",redirectTo:"",pathMatch:"full"},
  {path:"editprofile",component:ForumEditprofileComponent},
  {path:"adminpanel",component:ForumAdminpanelComponent},
  {path:"members",component:ForumMembersComponent},
  {path:"members/:user",component:ForumProfileComponent},
  {path:"login",component:ForumLoginComponent},
  {path:"register",component:ForumRegisterComponent},
  {path:"bans",component:ForumBansComponent},
  {path:"error",component:ForumNotfoundComponent},
  {path:"",component:ForumHomeComponent},
  {path:"**",redirectTo:"error",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
