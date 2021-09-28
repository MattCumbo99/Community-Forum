import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumHomeComponent } from './forum-home/forum-home.component';

const routes: Routes = [
  {path:"/forums",redirectTo:"",pathMatch:"full"},
  {path:"",component:ForumHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
