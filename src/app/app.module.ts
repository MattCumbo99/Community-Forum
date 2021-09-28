import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForumHomeComponent } from './forum-home/forum-home.component';
import { ForumLoginComponent } from './forum-login/forum-login.component';
import { ForumRegisterComponent } from './forum-register/forum-register.component';

@NgModule({
  declarations: [
    AppComponent,
    ForumHomeComponent,
    ForumLoginComponent,
    ForumRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
