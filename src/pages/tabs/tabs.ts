import { Component } from '@angular/core';

import { PetFormPage } from '../pet-form/pet-form';
import { CardListPage } from '../card-list/card-list';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HelloIonicPage;
  tab2Root = CardListPage;
  tab3Root = PetFormPage;

  constructor() {

  }
}
