import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private readonly tawkChatLink : string = 'https://tawk.to/chat/xxxxxxxxxxxxxxxxxxxxxxxx/default/?$_tawk_popout=true';

  constructor(public navCtrl: NavController, private iab: InAppBrowser) {

  }

  onClickChat() {
    const browser = this.iab.create(this.tawkChatLink,'_self',{location:'no'}); 
  }

}
