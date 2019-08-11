import { LanguagePopoverPage } from '../language-popover/language-popover.page';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PopoverController, AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialsForm: FormGroup;
 
  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService, 
              private popoverCtrl: PopoverController, 
              private alertCtrl: AlertController, 
              private translate: TranslateService,
              public nav: NavController,
              ) { }
 
  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(){
    this.authService.login(this.credentialsForm.value).subscribe();
  }
 
  // register() {
  //   this.authService.register(this.credentialsForm.value).subscribe(res => {
  //     this.authService.login(this.credentialsForm.value).subscribe();
  //   });
  // }

  public register() {
    this.nav.navigateForward('/register');
  }

  async showAlert(ev) {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('ALERT.header'),
      message: this.translate.instant('ALERT.msg'),
      buttons: ['OK']
    });
    alert.present();
  }

  async openLanguagePopover(ev) {
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverPage,
      event: ev
    });
    await popover.present();
  }
 
}