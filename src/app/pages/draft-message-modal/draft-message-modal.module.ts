import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DraftMessageModalPage } from './draft-message-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DraftMessageModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DraftMessageModalPage]
})
export class DraftMessageModalPageModule {}
