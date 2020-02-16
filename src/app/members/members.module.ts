import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MembersPage } from './members.page';
import { DraftMessageModalPage } from '../pages/draft-message-modal/draft-message-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MembersPage,
    children: [
      {
        path: 'dashboard', loadChildren: '../members/dashboard/dashboard.module#DashboardPageModule'
      },
      {
        path: 'home', loadChildren: '../members/home/home.module#HomePageModule'
      },
      {
        path: 'messages', loadChildren: '../members/messages/messages.module#MessagesPageModule'
      },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [MembersPage, DraftMessageModalPage],
  entryComponents: [DraftMessageModalPage],
})
export class MembersPageModule { }