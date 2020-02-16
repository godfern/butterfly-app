import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from './../../services/user.service';
import { OtpService } from './../../services/otp.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  otpForm: FormGroup;
  data = { emailId: '', userId: '', accId: '' };
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public toastCtrl: ToastController,
    private userService: UserService,
    private otpService: OtpService,
    private router: Router) { }

  ngOnInit() {
    this.otpForm = this.formBuilder.group({
      otpCode: ['', [Validators.required]]
    })

    this.data['emailId'] = this.route.snapshot.paramMap.get('emailId');
    this.data['userId'] = this.route.snapshot.paramMap.get('_id');
    this.data['accId'] = this.route.snapshot.paramMap.get('accId');

    this.presentToast(this.data)
  }

  async resendOTP(e) {
    const { userId, emailId } = this.data;
    if (userId) {
      this.otpService.sendOTP({ id: userId }).subscribe((res: any) => {
        this.presentToast({ emailId })
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    const { userId, accId, emailId } = this.data;
    const { otpCode } = this.otpForm.value

    if (this.otpForm.invalid) {
      return;
    }

    let payload = {
      "userId": userId,
      "accId": accId,
      "code": otpCode
    }

    this.otpService.verifyOTP(payload).subscribe((res: any) => {

    });
  }

  async presentToast(data: { emailId: string; }) {
    const toast = await this.toastCtrl.create({
      message: `OTP is sent to your email id: ${data.emailId}`,
      duration: 10000
    });
    toast.present();
  }
}
