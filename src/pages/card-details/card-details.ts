import { Component, ViewChild } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NavController, NavParams, Content, ToastController, AlertController } from 'ionic-angular';

import { global } from '../global'

@Component({
  selector: 'page-card-details',
  templateUrl: 'card-details.html'
})
export class CardDetailsPage {

  item: any;
  @ViewChild(Content) content: Content;
  @ViewChild('commentText') commentText: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private toastCtrl: ToastController, public alerCtrl: AlertController) {
    this.item = navParams.get('item');
    for (let comment of this.item.commentList) {
      comment['avatar'] = null;
      if (comment.userId.length > 5) {
        comment['avatar'] = 'https://graph.facebook.com/' + comment.userId + '/picture';
      }
    }
    // window.localStorage.setItem('userid', '2'); //for test
    if (this.item.operator === window.localStorage.getItem('userid')){
    // if (this.item.operator === "test"){
      this.item.isOwner = true;
    }
  }

  comment() {
    if (this.checkLogin() === false) return;
    let userId = window.localStorage.getItem('userid');
    console.log(this.commentText);
    // console.log(this.commentText.value);

    if (this.commentText.value == '') {
      this.presentToast('You must input something')
      return;
    }

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let url = 'https://adoptmacao.ddns.net/Adopt/sayhello/comment';
    let options = new RequestOptions({ headers: headers });

    let body = {
      // userid: "1306532112799708",
      userid: window.localStorage.getItem('userid'),
      adopt: this.item.id,
      content: this.commentText.value
    }

    // let userId = '1306532112799708';
    let avatar = null;
    if (userId.length > 5) {
      avatar = 'https://graph.facebook.com/' + userId + '/picture';
    }

    let commentInAdopt = {
      // userId: "1306532112799708",
      userId: userId,
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

  adoptFinish() {
    if (this.checkLogin() === false) return;

    let title   = '確認完成領養?';
    let message = '確認領養完成後, 相關內容將不會再顯示';

    this.doConfirm(title, message, () => {
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      let url = 'https://adoptmacao.ddns.net/Adopt/sayhello/finish';
      let options = new RequestOptions({ headers: headers });

      let body = {
        adopt: this.item.id
      }

      this.http.post(url, body, options)
      .subscribe(data => {
        console.log('success: ' + data);
        global.refresh = true;
        this.navCtrl.pop();
      }, error => {
        console.log('error: ' + error);
        this.presentToast("操作失敗, 請稍後再試");
      });
    });
  }

  dislike() {
    if (this.checkLogin() === false) return;
    let title   = '確認檢舉?';
    let message = '被檢舉達一定數量, 相關內容將不會再顯示';

    this.doConfirm(title, message, () => {
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      let url = 'https://adoptmacao.ddns.net/Adopt/sayhello/dislike';
      let options = new RequestOptions({ headers: headers });

      let body = {
        adopt: this.item.id
      }

      this.http.post(url, body, options)
      .subscribe(data => {
        console.log('success: ' + data);
        global.refresh = true;
        this.navCtrl.pop();
      }, error => {
        console.log('error: ' + error);
        this.presentToast("操作失敗, 請稍後再試");
      });
    });
  }

  doConfirm(title: any, message: any, agreeCallback: any) {
    let confirm = this.alerCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '確認',
          handler: () => {
            console.log('Agree clicked');
            agreeCallback();
          }
        }
      ]
    });
    confirm.present();
  }

  checkLogin() {
  	let userId = window.localStorage.getItem('userid');
    if (userId === null || userId === "undefined") {
      this.presentToast("Please login");
      return false;
    }
    return true;
  }
}
