import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MessageService } from './../../services/message.service';
 
@Component({
  selector: 'app-draft-message-modal',
  templateUrl: './draft-message-modal.page.html',
  styleUrls: ['./draft-message-modal.page.scss'],
})
export class DraftMessageModalPage implements OnInit {
  
  modalTitle:string;
  modelId:number;
  draftMessageForm: FormGroup;
  displayCalender:boolean;
  messageData = { to: '', selectedRadioItem: '', scheduledDate: new Date().toISOString(), message: '' };
 
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private message: MessageService,
    public toastCtrl: ToastController
  ) { }
 
  ngOnInit() {
    // console.table(this.navParams);
    // this.modelId = this.navParams.data.paramID;

    this.draftMessageForm = new FormGroup({
      to: new FormControl('',[ Validators.required, Validators.email]),
      scheduledDate: new FormControl(),
      message: new FormControl('',Validators.required)
    })
    this.modalTitle = this.navParams.data.paramTitle;

    
  }
 
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  radioDateSelect(event) {
    const {value} = event.detail;
    this.displayCalender = (value === 'schedule');
    this.messageData['scheduledDate'] = value === 'now' ? "" : new Date().toISOString();
    this.messageData['selectedRadioItem'] = value;

  }

  onSubmit(): void{
    const { to, scheduledDate, selectedRadioItem, message } = this.messageData;
    // console.log('example',this.messageData);

    if(selectedRadioItem === 'now'){
      this.presentToast({messageText: 'Sending message...',duration:1000});
      this.message.sendMessage(this.messageData).subscribe(() => {
        this.presentToast({messageText: 'Message sent',duration:1000});
        this.closeModal()
      });
    }else {
      this.presentToast({messageText: 'Scheduling message...',duration:1000});
      this.message.scheduleMessage(this.messageData).subscribe((res: any) => {
        this.presentToast({messageText: 'Message scheduled',duration:1000});
        this.closeModal()
      });
    }
  }

  onClear(): void {
    this.draftMessageForm.reset()
  }

  async presentToast(toastData) {
    const toast = await this.toastCtrl.create({
      message: toastData.messageText,
      duration: toastData.duration
    });
    toast.present();
  }
}