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
		for (let comment of this.item.commentList) {
      comment['avatar'] = null;
		  if (comment.userId.length > 5) {
		    comment['avatar'] = 'https://graph.facebook.com/' + comment.userId + '/picture';
      }
    }
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

		let userId = '1306532112799708';
    // let userId = window.localStorage.getItem('userid');
    let avatar = null;
    if (userId.length > 5) {
      avatar = 'https://graph.facebook.com/' + userId + '/picture';
    }

		let commentInAdopt = {
			userId: "1306532112799708",
      avatar: avatar,
			content: this.commentText.value
		}

		this.http.post(url, body, options)
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
