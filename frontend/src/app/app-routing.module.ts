import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticpageComponent } from './analyticpage/analyticpage.component';
import { ContactpageComponent } from './contactpage/contactpage.component';

const routes: Routes = [
  {path: '', component: ContactpageComponent},
  {path:'analytics',component:AnalyticpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
