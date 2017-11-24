import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';

import { Platform } from 'ionic-angular';

// rxjs.
import { Observable } from "rxjs/Observable";

/*
  Generated class for the NetworkConnectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkConnectionProvider {

  private onDevice: boolean;
  private isConnected: boolean = false;;

  constructor(private network: Network, private platform: Platform) {
    console.log('Hello NetworkConnectionProvider Provider');
    this.onDevice = this.platform.is('cordova');
    this.isOnline();
    console.log(this.isConnected);
  }

  getNetwork() {
    return this.network;
  }

  hasConnection() {
    return this.isConnected;
  }
  
  isOnline() {
    if(this.onDevice && this.network.type){
      this.isConnected = this.network.type !== "NONE";
    } else {
      this.isConnected = navigator.onLine;
    }
  }
  
  isOffline() {
    if(this.onDevice && this.network.type){
      this.isConnected = this.network.type === "NONE";
    } else {
      this.isConnected = !navigator.onLine;  
    }
  }

  onOnline() {
    console.log('Network connected!');
    this.isConnected = true;
  }

  onOffline() {
    console.log('Network was disconnected :-(');
    this.isConnected = false;
  }

  addConnectivityListenersBrowser() {
    window.addEventListener('online', this.onOnline.bind(this));
    window.addEventListener('offline', this.onOffline.bind(this));
  }

  addConnectivityListenersDevice() {
    this.watchNetworkConnection().subscribe(() => {
      this.onOnline();
    });

    this.watchNetworkDisconnect().subscribe(() => {
      this.onOffline();
    });
  }

  /* Listerners Device */

  watchNetworkDisconnect() : Observable<any> {
    return this.network.onDisconnect();
  }

  stopDisconnectWatch(disconnectSubscription) {
    // Stop disconnect watch;
    disconnectSubscription.unsubscribe();
  }

  watchNetworkConnection() : Observable<any> {
    return this.network.onConnect();
  }

  stopConnectWatch(connectSubscription) {
    // Stop connect watch.
    connectSubscription.unsubscribe();
  }

}
