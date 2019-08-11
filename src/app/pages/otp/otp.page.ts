import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  otpForm: FormGroup;
  data = '';

  constructor(private formBuilder: FormBuilder,
      private route: ActivatedRoute,
    public toastCtrl: ToastController) {}

  

  ngOnInit() {
    this.otpForm = this.formBuilder.group({
      otpCode: ['', [Validators.required]]
    })

    this.data = this.route.snapshot.paramMap.get('emailId');
    this.presentToast(this.data)
  }

  async presentToast(emailId) {
    const toast = await this.toastCtrl.create({
      message: `OTP is sent to your email id: ${emailId}`,
      duration: 10000
    });
    toast.present();
  }

}
