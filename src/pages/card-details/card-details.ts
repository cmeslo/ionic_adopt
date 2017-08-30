import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-card-details',
  templateUrl: 'card-details.html'
})
export class CardDetailsPage {

	selectedCard: any;

	constructor(public navParams: NavParams) {
		this.selectedCard = navParams.get('item');
	}
}