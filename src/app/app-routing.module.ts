import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'login/:emailId', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'otp/:emailId/:_id/:accId', loadChildren: './pages/otp/otp.module#OtpPageModule' },
  { path: 'language-popover', loadChildren: './pages/language-popover/language-popover.module#LanguagePopoverPageModule' },
  {
    path: 'members',
    canActivate: [AuthGuard],
    loadChildren: './members/members.module#MembersPageModule'
  },
  { path: 'scheduled', loadChildren: './members/messages/scheduled/scheduled.module#ScheduledPageModule' },
  { path: 'sent', loadChildren: './members/messages/sent/sent.module#SentPageModule' },
  { path: 'forgot-password', loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
];

@NgModule({
  imports: [
    
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
