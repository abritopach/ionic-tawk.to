import { Component } from '@angular/core';
import { Platform, NavController, AlertController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { NetworkConnectionProvider } from '../../providers/network-connection/network-connection';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private readonly tawkChatLink : string = 'https://tawk.to/chat/5a144685bb0c3f433d4ca72e/default/?$_tawk_popout=true';

  constructor(public navCtrl: NavController, private iab: InAppBrowser, private networkConnection: NetworkConnectionProvider,
    private platform: Platform, private alertCtrl: AlertController) {
      this.addConnectivityListeners();
  }

  addConnectivityListeners() {

    this.platform.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      // Platform now ready, execute any required native code.
      if (readySource == "cordova") {
        this.networkConnection.addConnectivityListenersDevice();
      }
      else if (readySource == "dom") {
         this.networkConnection.addConnectivityListenersBrowser();
      }
    });
    
  }

  onClickChat() {
    if (this.networkConnection.hasConnection()) {
      const browser = this.iab.create(this.tawkChatLink,'_self',{location:'no'}); 
    }
    else this.presentAlert();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error Internet Connection',
      subTitle: 'There is no internet connection. Please check your connection.',
      buttons: ['OK']
    });
    alert.present();
  }
  

}
