import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecursoPage } from './recurso.page';

const routes: Routes = [
  {
    path: '',
    component: RecursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecursoPageRoutingModule {}
