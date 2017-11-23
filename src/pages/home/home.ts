import { Component } from '@angular/core';
import { Platform, NavController, AlertController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { NetworkConnectionProvider } from '../../providers/network-connection/network-connection';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hasConnection: boolean = false;

  private readonly tawkChatLink : string = 'https://tawk.to/chat/5a144685bb0c3f433d4ca72e/default/?$_tawk_popout=true';

  constructor(public navCtrl: NavController, private iab: InAppBrowser, private networkConnection: NetworkConnectionProvider,
    private platform: Platform, private alertCtrl: AlertController) {
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter");
    this.platform.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      // Platform now ready, execute any required native code.
      if (readySource == "cordova") {

        if (this.networkConnection.getNetwork().type != "NONE") {
          this.hasConnection = true;
        }

        this.networkConnection.watchNetworkConnection().subscribe(() => {
          console.log('Network connected!');
          // We just got a connection but we need to wait briefly
          // before we determine the connection type. Might need to wait.
          // prior to doing any api requests as well.
          this.hasConnection = true;
          setTimeout(() => {
            if (this.networkConnection.getNetwork().type === 'wifi') {
              console.log('We got a wifi connection, woohoo!');
            }
          }, 3000);
        });
    
        this.networkConnection.watchNetworkDisconnect().subscribe(() => {
          console.log('Network was disconnected :-(');
          this.hasConnection = false;
        });
      }
      else if (readySource == "dom") {
        if (navigator.onLine) {
          this.online();
        }
        window.addEventListener('online', this.online.bind(this));
        window.addEventListener('offline', this.offline.bind(this));
      }

    });
  }

  online() {
    console.log('Network connected!');
    this.hasConnection = true;
  }

  offline() {
    console.log('Network was disconnected :-(');
    this.hasConnection = false;
  }

  onClickChat() {
    if (this.hasConnection) {
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
