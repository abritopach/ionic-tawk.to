import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';

// rxjs.
import { Observable } from "rxjs/Observable";

/*
  Generated class for the NetworkConnectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkConnectionProvider {

  constructor(private network: Network) {
    console.log('Hello NetworkConnectionProvider Provider');
  }

  getNetwork() {
    return this.network;
  }

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
