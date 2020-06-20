import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { ForgotPasswordPage } from './forgot-password.page';
import { RestPasswordModalPage } from '../reset-password-modal/reset-password-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  providers: [],
  declarations: [ForgotPasswordPage,RestPasswordModalPage],
  entryComponents: [RestPasswordModalPage]
})
export class ForgotPasswordPageModule { }
