import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication.service';
import { MustMatch } from '../../_shared/helpers/form.helper';
 
@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.page.html',
  styleUrls: ['./reset-password-modal.page.scss'],
})
export class RestPasswordModalPage implements OnInit {
  
  modalTitle:string;
  modelId:number;
  resetPasswordForm: FormGroup;
  emailId:string;
 
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private navParams: NavParams,
    public toastCtrl: ToastController,
    private authService: AuthenticationService,
    private router: Router
  ) { }
 
  ngOnInit() {
    this.emailId = this.navParams.data.emailId;

    this.resetPasswordForm = this.formBuilder.group({
      passcode: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      })
    this.modalTitle = this.navParams.data.paramTitle;

    
  }
 
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }


  onSubmit(): void{
    const { passcode, password } = this.resetPasswordForm.value;
    const resetPasswordData = {
      resetToken: passcode,
      newpassword: password,
      emailId:this.emailId

    }

    this.authService.resetPassword(resetPasswordData).subscribe((res: any) => {
      const { data } = res;
      this.closeModal();
      this.presentToast();
      this.router.navigate(['/login']);
    });
  }

  onClear(): void {
    this.resetPasswordForm.reset()
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: "Password reset successfully",
      duration: 5000
    });
    toast.present();
  }
}