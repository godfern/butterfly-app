import { PopoverController } from '@ionic/angular';
import { LanguageService } from './../../services/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-popover',
  templateUrl: './language-popover.page.html',
  styleUrls: ['./language-popover.page.scss'],
})
export class LanguagePopoverPage implements OnInit {
  languages = [];
  selected = '';

  constructor(private languageService: LanguageService, private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;
  }

  select(lng) {
    this.languageService.setLanguage(lng);
    this.popoverCtrl.dismiss();
  }

}