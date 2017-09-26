import { Component } from '@angular/core';
import { ViewController, PopoverController } from 'ionic-angular';

@Component({
  template: `
    <ion-list>
      <ion-list-header color="primary">類型</ion-list-header>
      <ion-item *ngFor="let item of popoverItemList" (click)="setSelectedTitle(item.name)">
        {{item.name}}
      </ion-item>
    </ion-list>
  `
})
export class PopoverPage {

  popoverItemList = [{name: '全部'}, {name: '狗'}, {name: '貓'}, {name: '其他'}];
  selectedTitle: string;

  constructor(public viewCtrl: ViewController) {
    this.selectedTitle = '';
  }

  setSelectedTitle(selectedItem) {
    this.selectedTitle = selectedItem;
    this.viewCtrl.dismiss(this.selectedTitle);
  }

  // close() {
  //   this.viewCtrl.dismiss();
  // }
}