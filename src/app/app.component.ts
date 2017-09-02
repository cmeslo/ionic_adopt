import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { CardListPage } from '../pages/card-list/card-list';
import { PetFormPage } from '../pages/pet-form/pet-form';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';


@Component({
  templateUrl: 'app.html',
  providers: [Keyboard]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  // rootPage = HelloIonicPage;
  // pages: Array<{title: string, component: any}>;
  rootPage:any = TabsPage;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private keyboard: Keyboard
  ) {
    this.initializeApp();

    // set our app's pages
    // this.pages = [
    //   { title: 'Hello Ionic', component: HelloIonicPage },
    //   { title: 'My First List', component: ListPage },
    //   { title: 'Card List', component: CardListPage },
    //   { title: 'Pet Form', component: PetFormPage }
    // ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
