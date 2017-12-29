import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { ApiComponent } from './components/api/api.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent,
  },
  {
    path: 'api', component: ApiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
