import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication.service';

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
              private authService: AuthenticationService, public registerUtils: RegisterUtils) { }

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

        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
        let payload =  this.registerUtils.getRegisterPayload(this.registerForm.value); 

      this.authService.register(payload).subscribe(res => {
      // this.authService.login(this.registerForm.value).subscribe();
      });
  }

}
