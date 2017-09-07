import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CardDetailsPage } from '../card-details/card-details';
// import { HTTP } from '@ionic-native/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { global } from '../global'

@Component({
  selector: 'page-card-list',
  templateUrl: 'card-list.html'
})
export class CardListPage {
	// allItems: Array<{img: string, title: string, date: string, note: string}>;
	// items: Array<{img: string, title: string, date: string, note: string}>;
	items: Array<{
		id: number,
		title: string,
		desc: string,
		age: string,
		gender: string,
		contactNumber: string,
		otherContact: string,
		status: string,
		operatTime: string,
		loveSet: Array<{id: number, title: string}>,
		commentList: Array<{id: number, contenct: string, userId: string}>,
		dislike: number,
		operator: string,
		image: string
	}>;
	myInput: string;

	constructor(public http: Http, public navCtrl: NavController) {
		//this.allItems = [];
		this.items = [];
		this.initializeItems();
		this.myInput = '';

		// for (let i = 0; i < 2; ++i) {
		// 	this.items.push({
		// 		img: 'assets/img/dog_01.jpg',
		// 		title: 'Husky',
		// 		date: '5 hrs ago',
		// 		note: 'Husky /ˈhʌski/ is a general name for a sled-type of dog used in northern regions, differentiated from other sled-dog types by their fast pulling style.'
		// 	});
		// }
	}

	initializeItems() {
		// this.http.get('http://127.0.0.1:8080/infoCard').map(res => res.json())
		this.http.get('http://adoptmacao.ddnsking.com:8080/Adopt/sayhello/getAdopt/0').map(res => res.json())
		.subscribe(data => {
			for (var i = 0; i < data.length; ++i) {
				this.items.push(data[i]);
			}
			//this.allItems = this.items;
		}, error => {
			console.log(error);
		});
	}

	cardTapped(event, item) {
		this.navCtrl.push(CardDetailsPage, {
			item: item
		});
	}

	doInfinite(infiniteScroll) {

		console.log("currentId: " + global.currentId);
		global.currentId++;

		// console.log('Begin async operation');

		setTimeout(() => {
			// for (let i = 0; i < 2; ++i) {
				// this.http.get('https://www.reddit.com/r/gifs/new/.json?limit=10').map(res => res.json())
			this.http.get('http://adoptmacao.ddnsking.com:8080/Adopt/sayhello/getAdopt/' + global.currentId).map(res => res.json())
			.subscribe(data => {
				for (var i = 0; i < data.length; ++i) {
					// this.allItems.push(data[i]);
					this.items.push(data[i]);
				}
			}, error => {
				console.log(error);
			});

		// 		// this.items.push({
		// 		// 	img: 'assets/img/dog_01.jpg',
		// 		// 	title: 'Husky',
		// 		// 	note: 'Husky /ˈhʌski/ is a general name for a sled-type of dog used in northern regions, differentiated from other sled-dog types by their fast pulling style.'
		// 		// });
		// 	}

		// 	console.log('doInfinite - this.myInput: ' + this.myInput);
		// 	let val = this.myInput;

		// 	if (val && val.trim() != '') {
		// 		this.items = this.allItems.filter((item) => {
		// 			return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
		// 		});
		// 	}
		// 	console.log('doInfinite-allItems: ' + this.allItems.length);
		// 	console.log('doInfinite-items: ' + this.items.length);

			console.log('Async operation has ended');
			infiniteScroll.complete();

		}, 500);
	}

	getItems(ev: any) {
		//this.initializeItems();

		// let val = ev.target.value;

		// console.log('getItems-allItems: ' + this.allItems.length);
		// console.log('getItems-items: ' + this.items.length);

		// if (val && val.trim() != '') {
		// 	// this.items = this.items.filter((item) => {
		// 	// 	return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
		// 	// });
		// 	this.items = this.allItems.filter((item) => {
		// 		return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
		// 	});
		// }

		// if (!val.length) {
		// 	console.log('items = allItems');
		// 	this.items = this.allItems.slice();
		// 	console.log('afterempty-allItems: ' + this.allItems.length);
		// 	console.log('afterempty-items: ' + this.items.length);
		// }
	}

	onClear(ev: any) {
		// console.log('onClear-allItems: ' + this.allItems.length);
		// console.log('onClear-items: ' + this.items.length);
		// let val = ev.target.value;

		// this.items = this.allItems.slice();
	}
}