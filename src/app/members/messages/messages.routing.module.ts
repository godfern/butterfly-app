import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesPage } from './messages.page';

const routes: Routes = [
  {
    path: 'messages',
    component: MessagesPage,
    children: [
      {
        path: 'scheduled',
        loadChildren: './scheduled/scheduled.module#ScheduledPageModule'
      },
      {
        path: 'sent',
        loadChildren: './sent/sent.module#SentPageModule'
      },
      {
        path: '',
        redirectTo: 'messages/scheduled',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'messages/scheduled',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MessagesRoutingModule {}