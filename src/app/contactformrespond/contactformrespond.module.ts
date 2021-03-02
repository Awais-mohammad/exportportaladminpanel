import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactformrespondPageRoutingModule } from './contactformrespond-routing.module';

import { ContactformrespondPage } from './contactformrespond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactformrespondPageRoutingModule
  ],
  declarations: [ContactformrespondPage]
})
export class ContactformrespondPageModule {}
