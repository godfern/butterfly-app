import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RestPasswordModalPage } from './reset-password-modal.page';

const routes: Routes = [
  {
    path: '',
    component: RestPasswordModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RestPasswordModalPage]
})
export class RestPasswordModalPageModule {}
