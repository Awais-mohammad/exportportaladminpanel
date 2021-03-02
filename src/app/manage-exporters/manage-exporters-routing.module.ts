import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageExportersPage } from './manage-exporters.page';

const routes: Routes = [
  {
    path: '',
    component: ManageExportersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageExportersPageRoutingModule {}
