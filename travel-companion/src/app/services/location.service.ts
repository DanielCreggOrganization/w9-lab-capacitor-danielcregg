import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  async getCurrentPosition() {
    try {
      const options = {
        enableHighAccuracy: false, // Set to false for faster initial response
        timeout: 30000, // Increased timeout
        maximumAge: 60000 // Allow cached positions up to 1 minute old
      };

      // Check if running on native platform
      if (Capacitor.isNativePlatform()) {
        const permissionStatus = await this.requestPermissions();
        if (permissionStatus.location !== 'granted') {
          throw new Error('Location permission not granted');
        }
      }

      // Try to get position
      const position = await Geolocation.getCurrentPosition(options);
      if (!position) {
        throw new Error('Unable to get position');
      }
      
      return position;
    } catch (error: any) {
      // Handle specific error codes
      if (error.code === 2) { // POSITION_UNAVAILABLE
        throw new Error('Location service is unavailable. Please check if location services are enabled.');
      } else if (error.code === 1) { // PERMISSION_DENIED
        throw new Error('Location permission denied. Please enable location services in your settings.');
      } else if (error.code === 3) { // TIMEOUT
        throw new Error('Location request timed out. Please try again.');
      }
      throw error;
    }
  }

  private async requestPermissions() {
    try {
      return await Geolocation.requestPermissions();
    } catch (error) {
      console.error('Permission request failed:', error);
      throw new Error('Failed to request location permissions');
    }
  }
}
