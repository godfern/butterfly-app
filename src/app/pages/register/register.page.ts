import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthenticationService } from './../../services/authentication.service';
import { OtpService } from './../../services/otp.service';
import { MustMatch } from '../../_shared/helpers/form.helper';
import { RegisterUtils } from '../../utils/register';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private otpService: OtpService,
    public registerUtils: RegisterUtils,
    private nav: NavController,
    private router: Router,
    private alertController: AlertController) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      })

  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    let payload = this.registerUtils.getRegisterPayload(this.registerForm.value);
    this.authService.register(payload).subscribe((res: any) => {
      const { emailId, _id } = res;
      this.otpService.sendOTP({ id: _id }).subscribe((res: any) => {
        const { success, data } = res;
        if (success) {
          this.router.navigate(['/otp', emailId, _id, data.accId]);
        } else {
          this.showAlert('Something went wrong');
        }

      })
    });
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}
