import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DraftMessageModalPage } from '../pages/draft-message-modal/draft-message-modal.page'

@Component({
  selector: 'app-menu',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  selectedPath = '';

  public pages = [
    {
      title: 'Dashboard',
      url: './dashboard'
    },
    // {
    //   title: 'Home',
    //   url: './home'
    // },
    {
      title: 'Messages',
      url: './messages'
    }
  ];

  constructor(private router: Router, public modalController: ModalController) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {

  }

  async openModal() {
    const modal = await this.modalController.create({
      component: DraftMessageModalPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Compose Message"
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

}