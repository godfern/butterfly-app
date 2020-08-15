import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from './../../services/authentication.service';
import { RestPasswordModalPage } from '../reset-password-modal/reset-password-modal.page';

@Component({
  selector: 'app-login',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

    forgotPasswordForm: FormGroup;
    appLogo: 'assets/app-icon.png'

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    public toastCtrl: ToastController,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      provider:['EMAIL']
    })
  }

  onSubmit() {
    const { emailId } = this.forgotPasswordForm.value;
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe((res: any) => {
      const { data } = res;
      this.presentToast({ emailId });
      this.openModal(emailId);
    });
  }

  async openModal(emailId) {
    const modal = await this.modalController.create({
      component: RestPasswordModalPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Reset Password",
        "emailId": emailId
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        // this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
 
    return await modal.present();
  }

  async presentToast(data: { emailId: string; }) {
    const toast = await this.toastCtrl.create({
      message: `OTP is sent to your email id: ${data.emailId}`,
      duration: 5000
    });
    toast.present();
  }
}