import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

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
  senderId:string;
  messageData = { to: '', selectedRadioItem: '', scheduledDate: new Date().toISOString(), message: '' };
 
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private message: MessageService,
    public toastCtrl: ToastController,
    private storage: Storage,
  ) { }
 
  ngOnInit() {
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

    this.storage.get('userId').then((id) => {
      this.senderId = id;
      console.log('ID:'+id);
      console.log('Me: Hey, ' + name + '! You have a very nice name.');
    });

    let payload = {
      senderId: this.senderId,
      reciverEmail: to,
      title: "My Message",
      content: message
    }

    if(selectedRadioItem === 'now'){
      this.presentToast({messageText: 'Sending message...',duration:1000});

      this.message.sendMessage(payload).subscribe(() => {
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