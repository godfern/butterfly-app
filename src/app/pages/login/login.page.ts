import { LanguagePopoverPage } from '../language-popover/language-popover.page';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PopoverController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './../../services/language.service';

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

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private popoverCtrl: PopoverController,
    private translate: TranslateService,
    public nav: NavController,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;

    this.languages.map(lang => {
      if (lang.value === this.selected) {
        this.selectedLang = lang;
      }
    })
  }

  onSubmit() {
    this.authService.login(this.credentialsForm.value).subscribe();
  }

  public register() {
    this.nav.navigateForward('/register');
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