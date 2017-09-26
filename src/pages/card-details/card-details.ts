import { Component, ViewChild } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NavController, NavParams, Content, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-card-details',
  templateUrl: 'card-details.html'
})
export class CardDetailsPage {

	item: any;
	@ViewChild(Content) content: Content;
	@ViewChild('commentText') commentText: any;

	constructor(public navParams: NavParams, public http: Http, private toastCtrl: ToastController) {
		this.item = navParams.get('item');
	}

	comment() {
		console.log(this.commentText);
		// console.log(this.commentText.value);

		if (this.commentText.value == '') {
			this.presentToast('You must input something')
			return;
		}

		let headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		let url = 'http://adoptmacao.ddns.net:8080/Adopt/sayhello/comment';
		let options = new RequestOptions({ headers: headers });

		let body = {
			userid: "001",
			adopt: this.item.id,
			content: this.commentText.value
		}
		let commentInAdopt = {
			userId: "001",
			content: this.commentText.value
		}

		this.http.post(url, body, options).map(res => res.json())
		.subscribe(data => {
			console.log('success: ' + data);			
		}, error => {
			console.log('error: ' + error);
		});

		this.item.commentList.push(commentInAdopt);
		this.commentText.value = '';
		this.content.scrollToBottom(300);

	}

	presentToast(message) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'bottom'
		});

		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}
}