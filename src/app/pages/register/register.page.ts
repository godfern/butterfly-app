import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
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
  // payload = {};

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private otpService: OtpService,
    public registerUtils: RegisterUtils,
    private nav: NavController,
    private router: Router) { }

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

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    let payload = this.registerUtils.getRegisterPayload(this.registerForm.value);
    this.authService.register(payload).subscribe(res => {
      let emailId = res.emailId;
      this.otpService.sendOTP({id:res._id}).subscribe(res => {
        this.router.navigate(['/otp', emailId]);
      })
    });
  }
}
