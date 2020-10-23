import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritoPage } from './favorito.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritoPageRoutingModule {}
