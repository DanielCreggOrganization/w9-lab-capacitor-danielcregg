import { Injectable } from '@angular/core';
import { Network, ConnectionType, ConnectionStatus } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private networkStatus = new BehaviorSubject<boolean>(true);
  public networkStatus$ = this.networkStatus.asObservable();

  constructor() {
    this.initializeNetworkMonitoring();
  }

  private async initializeNetworkMonitoring() {
    // Get initial network status
    const status = await Network.getStatus();
    this.networkStatus.next(status.connected);

    // Listen for network changes
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed:', status);
      this.networkStatus.next(status.connected);
    });
  }

  async getCurrentNetworkStatus() {
    const status = await Network.getStatus();
    const details = {
      ...status,
      connectionQuality: this.getConnectionQuality(status.connectionType),
      isOnline: status.connected,
      isWifi: status.connectionType === 'wifi',
      isCellular: status.connectionType === 'cellular',
      isUnknown: status.connectionType === 'unknown',
      isNone: status.connectionType === 'none',
      timestamp: new Date().toISOString()
    };
    return details;
  }

  private getConnectionQuality(connectionType: ConnectionType): string {
    switch (connectionType) {
      case 'wifi':
        return 'High';
      case 'cellular':
        return 'Medium';
      case 'none':
        return 'No Connection';
      default:
        return 'Unknown';
    }
  }
}
