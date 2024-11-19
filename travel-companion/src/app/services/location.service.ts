import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  async getCurrentPosition() {
    try {
      // For browser testing, we'll use a more permissive configuration
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,  // Increased timeout for browser
        maximumAge: 0
      };

      // Check if the platform is not web before requesting permissions
      if (Capacitor.isNativePlatform()) {
        await this.requestPermissions();
      }

      return await Geolocation.getCurrentPosition(options);
      
    } catch (error: any) {
      console.log('Geolocation error:', error);
      alert(`Error getting location (Code: ${error.code}): ${error.message}`);
      throw error;
    }
  }

  private async requestPermissions() {
    try {
      const status = await Geolocation.requestPermissions();
      console.log('Permission status:', status);
      return status;
    } catch (e) {
      console.log('Permission request error:', e);
      throw e;
    }
  }
}
