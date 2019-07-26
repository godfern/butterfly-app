import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialsForm: FormGroup;
 
  constructor(private formBuilder: FormBuilder,private authService: AuthenticationService) { }
 
  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(){
    this.authService.login(this.credentialsForm.value).subscribe();
  }
 
  register() {
    this.authService.register(this.credentialsForm.value).subscribe(res => {
      this.authService.login(this.credentialsForm.value).subscribe();
    });
  }
 
}