import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
// import { HTTP } from '@ionic-native/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ViewController, PopoverController } from 'ionic-angular';

import { CardDetailsPage } from '../card-details/card-details';
import { PetFormPage } from '../pet-form/pet-form';
import { PopoverPage } from '../card-list/pop-over';

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
	// allItems: Array<{
	// 	id: number,
	// 	title: string,
	// 	desc: string,
	// 	age: string,
	// 	gender: string,
	// 	contactNumber: string,
	// 	otherContact: string,
	// 	status: string,
	// 	operatTime: string,
	// 	loveSet: Array<{id: number, title: string}>,
	// 	commentList: Array<{id: number, contenct: string, userId: string}>,
	// 	dislike: number,
	// 	operator: string,
	// 	image: string
	// }>;

	// myInput: string;
	category: string;

	constructor(public http: Http, public navCtrl: NavController, public popoverCtrl: PopoverController, private toastCtrl: ToastController) {
		// this.allItems = [];
		this.items = [];
		this.initializeItems();
		// this.myInput = '';
		this.category = 'ALL';

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
		// this.http.get('http://adoptmacao.ddns.net:8080/Adopt/sayhello/getAdopt/0').map(res => res.json())
		// .subscribe(data => {
		// 	for (var i = 0; i < data.length; ++i) {

		// 		let loveSet = data[i]['loveSet'];
		// 		data[i]['btnColor'] = 'primary';
		// 		// let userId = window.localStorage.getItem('userId');
		// 		let userId = 1;

		// 		for (let c of loveSet) {
		// 			if (c['id'] == userId) data[i]['btnColor'] = 'secondary';
		// 		}

		// 		this.allItems.push(data[i]);
		// 		this.items.push(data[i]);
		// 	}
		// 	//this.allItems = this.items;
		// }, error => {
		// 	console.log(error);
		// });
		this.getAdopts(0);
	}

	cardTapped(event, item) {
		this.navCtrl.push(CardDetailsPage, {
			item: item
		});
	}

	doInfinite(infiniteScroll) {

		console.log("currentPage: " + global.currentPage);

		console.log('Begin async operation');

		let beforePage = global.currentPage;

		setTimeout(() => {
			// this.http.get('http://adoptmacao.ddns.net:8080/Adopt/sayhello/getAdopt/' + global.currentPage).map(res => res.json())
			// .subscribe(data => {
			// 	for (var i = 0; i < data.length; ++i) {
			// 		// this.allItems.push(data[i]);
			// 		this.items.push(data[i]);
			// 	}
			// 	global.currentPage++;
			// }, error => {
			// 	console.log(error);
			// });
			this.getAdopts(global.currentPage, this.category);

			if (beforePage === global.currentPage) { // nothing to load
				infiniteScroll.enable(false);
				setTimeout(() => {
					infiniteScroll.enable(true);
				}, 10000);
			}
			// this.items.push({
			// 	img: 'assets/img/dog_01.jpg',
			// 	title: 'Husky',
			// 	date: '1hr ago',
			// 	note: 'Husky /ˈhʌski/ is a general name for a sled-type of dog used in northern regions, differentiated from other sled-dog types by their fast pulling style.'
			// });


			console.log('Async operation has ended');
			infiniteScroll.complete();

		}, 500);
	}

	// onFilter(ev: any) {
	// 	let val = ev.target.value;
	// 	console.log('val: ' + val);

	// 	console.log('allItems: ' + this.allItems.length);
	// 	console.log('items: ' + this.items.length);

	// 	if (val && val.trim() != '') {
	// 		// this.items = this.items.filter((item) => {
	// 		// 	return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
	// 		// });
	// 		this.items = this.allItems.filter((item) => {
	// 			console.log('find: ' + item.title.toLowerCase().indexOf(val.toLowerCase()));
	// 			return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
	// 		});
	// 	}
	// 	console.log('allItems: ' + this.allItems.length);
	// 	console.log('items: ' + this.items.length);

	// 	if (val && !val.length) {
	// 		this.resumeAllItems();
	// 	}
	// }

	clickLike(event, item) {

		if (item['btnColor'] == 'secondary') return;

		let url = 'https://adoptmacao.ddns.net/Adopt/sayhello/like';

		let headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		let options = new RequestOptions({ headers: headers });

		let body = {
			// userid: "001",
      userid: window.localStorage.getItem('userid'),
			adopt: item.id
		}

		this.http.post(url, body, options)
		.subscribe(data => {
			console.log('success: ' + data);
		}, error => {
			console.log('error: ' + error);
		});
		item['btnColor'] = 'secondary';
		item['loves']++;
	}

	postAdopt() {
		this.navCtrl.push(PetFormPage, {});
	}

	presentPopover(myEvent) {
		let popover = this.popoverCtrl.create(PopoverPage, {category: this.category});
		popover.present({
			ev: myEvent
		});
		popover.onDidDismiss((popoverData) => {
			if (popoverData === null) return;
			console.log(popoverData);
			this.category = popoverData;
			global.currentPage = 0;
			this.items = [];
			this.getAdopts(global.currentPage, this.category);
		});
	}

	getAdopts(index, category = 'ALL') {

		let url = 'https://adoptmacao.ddns.net/Adopt/sayhello/getAdopt/' + index;

		if (category !== 'ALL') {
			url = url + '/type/' + category;
		}

		this.http.get(url).map(res => res.json())
		.subscribe(data => {

			if (data.length === 0 && index !== 0) {
				this.presentToast('已經到底了, 請稍後再嘗試!', 'bottom');
				return;
			}

			for (let i = 0; i < data.length; ++i) {

				let loveSet = data[i]['loveSet'];
				data[i]['btnColor'] = 'primary';
				let userId = window.localStorage.getItem('userid');
				// let userId = '001';
				for (let c of loveSet) {
					if (c['userId'] == userId) data[i]['btnColor'] = 'secondary';
				}

				data[i]['loves'] = data[i]['loveSet'].length;

				data[i]['operatTime'] = this.timeSince(new Date(data[i]['operatTime']));

				this.items.push(data[i]);
			}
			global.currentPage = index + 1;
		}, error => {
			console.log(error);
		});
	}

	timeSince(date) {

		let seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);
		if (seconds < 0) return "a few minutes ago";

		let interval = Math.floor(seconds / 31536000);

		if (interval > 1) {
			return interval + " years ago";
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + " months ago";
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + " days ago";
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + " hours ago";
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + " minutes ago";
		}
		return "a few minutes ago";
	}

	presentToast(message, position) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 2000,
			position: position
		});

		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}

  ionViewDidEnter() {
	  if (global.addFormed === true) {
      global.currentPage = 0;
      alert(global.addFormed);
      this.items = [];
      this.getAdopts(global.currentPage);
      global.addFormed = false;
    }
  }
}
