import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MembersPage } from './members.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [MembersPage]
})
export class MembersPageModule { }