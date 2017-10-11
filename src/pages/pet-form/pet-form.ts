import { AfterViewInit, ViewChild, Component, ElementRef } from '@angular/core';
import { Content, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

@Component({
  selector: 'page-pet-form',
  templateUrl: 'pet-form.html'
})

export class PetFormPage implements AfterViewInit {

  public base64Image: string;
  private petInfo: FormGroup;
  @ViewChild(Content) content: Content;
  @ViewChild('myInput') myInput: ElementRef;

  private imagePreview: any;

  constructor(private camera: Camera, private formBuilder: FormBuilder, public http: Http, private transfer: Transfer, private toastCtrl: ToastController) {
    this.petInfo = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      gender: [''],
      age: [''],
      contactNum: ['', Validators.required],
      otherContact: [''],
      description: ['']
    });
  }

  ngAfterViewInit() {
    console.log(this.content);
    //this.content.className = 'no-scroll';
    this.imagePreview = document.getElementById('imagePreview');
    this.base64Image = null;
  }

  petForm() {
    //console.log(this.petInfo.value);
    // if (this.base64Image === null ) {
    //   this.presentToast('請先上傳圖片', 'bottom');
    //   return;
    // }

    this.postPetForm();
  }

  postPetForm() {

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let body = {
      title: this.petInfo.value.title,
      desc: this.petInfo.value.description,
      age: this.petInfo.value.age,
      adoptType: this.petInfo.value.category,
      gender: this.petInfo.value.gender,
      contactNumber: this.petInfo.value.contactNum,
      otherContact: this.petInfo.value.otherContact,
      // operatTime: this.getCurrentTime(),

      status: 'A',
      operator: 'test'
      // loveSet: null,
      // commentList: null,
      // dislike: 1,
      // operator: 'operator123'*/

      // title : "this.username",
      // desc : "this.password",
      // gender : "MALE",
      // age : "123",
      // contactNumber : "666666",
      // otherContact : "wechat gggg",
      // status : "A"

    }
    console.log('body: ' + JSON.stringify(body));

    // let url = 'http://adoptmacao.ddns.net:8080/Adopt/sayhello/addForm';
    let url = 'https://adoptmacao.ddns.net/Adopt/sayhello/addForm';

    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options)
    // this.http.post('http://127.0.0.1:8080/postTest', body, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
          let test = document.getElementById('test-post');
          test.innerHTML = 'data: ' + data + '\n' + body;
          console.log('data: ' + data);
          if (this.base64Image != null) {
            let imageName = data;
            this.uploadImage(imageName);
          } else {
            this.presentToast('post successfully, but image is null', 'bottom');
          }
          this.petInfo.reset();
          this.base64Image = null;
        }, error => {
          let test = document.getElementById('test-post');
          test.innerHTML = 'error: ' + error + '/n' + body;
          console.log('error: ' + error);
          this.presentToast('上傳失敗, 請稍後再試', 'bottom'); 
        });
  }

  getPicture() {
    const options: CameraOptions = {
      quality: 50,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 800,
      targetHeight: 800
    };

  	this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.imagePreview.setAttribute('src', this.base64Image);
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

  choosePicture() {
    let options = {
      quality: 50,
      allowEdit: true,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 800,
      targetHeight: 800
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.imagePreview.setAttribute('src', this.base64Image);
      //this.imagePreview.style="max-width:200px"
    }, (err) => {
      console.log(err);
    });
  }

  getCurrentTime() {
    var currentDate = new Date();
    var datetime = currentDate.getFullYear() + '/'
                  + currentDate.getMonth() + '/'
                  + currentDate.getDay() + ' '
                  + currentDate.getHours() + ':'
                  + currentDate.getMinutes() + ':'
                  + currentDate.getSeconds();
    console.log(datetime);
    return datetime;
  }

  uploadImage(name : string) {
    const fileTransfer: TransferObject = this.transfer.create();
    let options: FileUploadOptions = {
        chunkedMode: false,
        fileKey: 'file',
        fileName: name + '.jpg',
        mimeType: 'image/jpeg',
        //headers: {Connection: "close"},
        params:{operatiune:'uploadpoza'}
      };
    // let url = 'http://adoptmacao.ddns.net:8080/Adopt/sayhello/fileupload';
    let url = 'https://adoptmacao.ddns.net/Adopt/sayhello/fileupload';

    fileTransfer.upload(this.base64Image, encodeURI(url), options)
      .then((data) => {
        let test = document.getElementById('test-image');
        test.innerHTML = 'image upload success: ' + JSON.stringify(data);
        alert("success 00");
      }, (err) => {
        let test = document.getElementById('test-image');
        test.innerHTML = 'image upload error: ' + JSON.stringify(err);
        alert("error");
      });
  }

  resize() {
    let ta = this.myInput['_elementRef'].nativeElement.querySelector("textarea");
    ta.style.overflow = "hidden";
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
  }

  presentToast(message, position) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: position
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}


