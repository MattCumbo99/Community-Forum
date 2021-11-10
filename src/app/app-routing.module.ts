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
import { ForumPostlistComponent } from './forum-postlist/forum-postlist.component';
import { ForumPostComponent } from './forum-post/forum-post.component';
import { ForumPostformComponent } from './forum-postform/forum-postform.component';

const routes: Routes = [
  {path:"forums",redirectTo:"",pathMatch:"full"},
  {path:"threads",redirectTo:"",pathMatch:"full"},
  {path:"forums/:category", component:ForumPostlistComponent},
  {path:"forums/:category/post-thread", component:ForumPostformComponent},
  {path:"threads/:postId", component:ForumPostComponent},
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
