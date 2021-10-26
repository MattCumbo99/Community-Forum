import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular material imports
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForumHomeComponent } from './forum-home/forum-home.component';
import { ForumLoginComponent } from './forum-login/forum-login.component';
import { ForumRegisterComponent } from './forum-register/forum-register.component';
import { ForumMembersComponent } from './forum-members/forum-members.component';
import { ForumNotfoundComponent } from './forum-notfound/forum-notfound.component';
import { GlobalVariables } from './common/global-variables';
import { ForumProfileComponent, DialogRoleChange, DialogBan, DialogUnban } from './forum-profile/forum-profile.component';
import { ForumBansComponent } from './forum-bans/forum-bans.component';
import { ForumEditprofileComponent } from './forum-editprofile/forum-editprofile.component';
import { ForumAdminpanelComponent } from './forum-adminpanel/forum-adminpanel.component';

@NgModule({
  declarations: [
    AppComponent,
    ForumHomeComponent,
    ForumLoginComponent,
    ForumRegisterComponent,
    ForumMembersComponent,
    ForumNotfoundComponent,
    ForumProfileComponent,
    DialogRoleChange,
    DialogBan,
    DialogUnban,
    ForumBansComponent,
    ForumEditprofileComponent,
    ForumAdminpanelComponent
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
    MatExpansionModule
  ],
  providers: [GlobalVariables],
  bootstrap: [AppComponent]
})
export class AppModule { }
