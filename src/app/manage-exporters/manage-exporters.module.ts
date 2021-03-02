import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageExportersPageRoutingModule } from './manage-exporters-routing.module';

import { ManageExportersPage } from './manage-exporters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageExportersPageRoutingModule
  ],
  declarations: [ManageExportersPage]
})
export class ManageExportersPageModule {}
