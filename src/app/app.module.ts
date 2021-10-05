import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForumHomeComponent } from './forum-home/forum-home.component';
import { ForumLoginComponent } from './forum-login/forum-login.component';
import { ForumRegisterComponent } from './forum-register/forum-register.component';
import { ForumMembersComponent } from './forum-members/forum-members.component';
import { ForumNotfoundComponent } from './forum-notfound/forum-notfound.component';
import { GlobalVariables } from './common/global-variables';

@NgModule({
  declarations: [
    AppComponent,
    ForumHomeComponent,
    ForumLoginComponent,
    ForumRegisterComponent,
    ForumMembersComponent,
    ForumNotfoundComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GlobalVariables],
  bootstrap: [AppComponent]
})
export class AppModule { }
