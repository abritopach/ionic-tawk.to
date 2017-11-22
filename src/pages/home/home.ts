import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { NetworkConnectionProvider } from '../../providers/network-connection/network-connection'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isOnline: boolean = false;

  private readonly tawkChatLink : string = 'https://tawk.to/chat/5a144685bb0c3f433d4ca72e/default/?$_tawk_popout=true';

  constructor(public navCtrl: NavController, private iab: InAppBrowser, private networkConnection: NetworkConnectionProvider) {
    console.log("constructor home.ts");

    /*
    networkConnection.watchNetworkConnection().subscribe(() => {
      console.log('Network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.networkConnection.getNetwork().type === 'wifi') {
          console.log('We got a wifi connection, woohoo!');
        }
      }, 3000);
    });

    networkConnection.watchNetworkDisconnect().subscribe(() => {
      console.log('Network was disconnected :-(');
    });
    */
    
  }

  onClickChat() {

    //if (this.isOnline)

    const browser = this.iab.create(this.tawkChatLink,'_self',{location:'no'}); 
  }

}
