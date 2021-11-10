import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular material imports
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForumHomeComponent, DialogCreateCategory, DialogCreateSubcategory, DialogCreateSubject } from './forum-home/forum-home.component';
import { ForumLoginComponent } from './forum-login/forum-login.component';
import { ForumRegisterComponent } from './forum-register/forum-register.component';
import { ForumMembersComponent } from './forum-members/forum-members.component';
import { ForumNotfoundComponent } from './forum-notfound/forum-notfound.component';
import { GlobalVariables } from './common/global-variables';
import { ForumProfileComponent, DialogRoleChange, DialogBan, DialogUnban, DialogReport } from './forum-profile/forum-profile.component';
import { ForumBansComponent } from './forum-bans/forum-bans.component';
import { ForumEditprofileComponent } from './forum-editprofile/forum-editprofile.component';
import { ForumAdminpanelComponent } from './forum-adminpanel/forum-adminpanel.component';
import { ForumPostComponent } from './forum-post/forum-post.component';
import { ForumPostlistComponent } from './forum-postlist/forum-postlist.component';
import { ForumPostformComponent } from './forum-postform/forum-postform.component';

@NgModule({
  declarations: [
    AppComponent,

    ForumHomeComponent,
    DialogCreateCategory,
    DialogCreateSubcategory,
    DialogCreateSubject,

    ForumLoginComponent,
    ForumRegisterComponent,
    ForumMembersComponent,
    ForumNotfoundComponent,

    ForumProfileComponent,
    DialogRoleChange,
    DialogBan,
    DialogUnban,
    DialogReport,

    ForumBansComponent,
    ForumEditprofileComponent,
    ForumAdminpanelComponent,
    ForumPostComponent,
    ForumPostlistComponent,
    ForumPostformComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatTooltipModule
  ],
  providers: [GlobalVariables],
  bootstrap: [AppComponent]
})
export class AppModule { }
