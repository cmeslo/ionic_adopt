import { Component } from '@angular/core';
import { ViewController, PopoverController, NavParams } from 'ionic-angular';

@Component({
  template: `
    <ion-list radio-group [(ngModel)]="category" (ionChange)="changeCategory()">
      <ion-list-header color="primary">類型</ion-list-header>
      <ion-item>
        <ion-label>全部</ion-label>
        <ion-radio value="ALL"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>狗</ion-label>
        <ion-radio value="DOG"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>貓</ion-label>
        <ion-radio value="CAT"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>其他</ion-label>
        <ion-radio value="OTHER"></ion-radio>
      </ion-item>
    </ion-list>
  `
})
export class PopoverPage {

  category;
  isParamInited: boolean;

  constructor(public viewCtrl: ViewController, private navParams: NavParams) {
  }

  ngOnInit() {
    this.setCategory();
  }

  setCategory() {
    this.isParamInited = false;
    if (this.navParams.data) {
      this.category = this.navParams.data.category;
    } else {
      this.category = 'ALL';
    }
  }

  changeCategory() {
    if (!this.isParamInited) {
      this.isParamInited = true;
      return;
    }
    if (this.category) this.viewCtrl.dismiss(this.category);
  }
}