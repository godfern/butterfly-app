import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PopoverController, NavController } from '@ionic/angular';

import { LanguagePopoverPage } from '../language-popover/language-popover.page';
import { LanguageService } from './../../services/language.service';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialsForm: FormGroup;
  languages = [];
  selected = '';
  selectedLang = {};
  message: string;
  appLogo: 'assets/app-icon.png'

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private popoverCtrl: PopoverController,
    public nav: NavController,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      provider:['EMAIL']
    })

    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;

    this.languages.forEach(lang => {
      if (lang.value === this.selected) {
        this.selectedLang = lang;
      }
    })
  }

  onSubmit() {
    this.authService.login(this.credentialsForm.value).subscribe((res: any) => {
      const { data } = res;
    });
  }

  public register() {
    this.nav.navigateForward('/register');
  }

  public forgotPassword() {
    this.nav.navigateForward('/forgot-password');
  }

  async openLanguagePopover(ev) {
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverPage,
      event: ev
    });
    await popover.present();
  }

  select(lng) {
    this.languageService.setLanguage(lng);
    this.popoverCtrl.dismiss();
  }
}