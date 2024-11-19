import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText } from '@ionic/angular/standalone';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { CameraService } from '../services/camera.service';
import { LocationService } from '../services/location.service';
import { DeviceInfoService } from '../services/device-info.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonText,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle
  ],
})
export class HomePage {
  capturedImage: string | undefined;
  currentLocation: { latitude: number; longitude: number } | undefined;
  locationError: string | undefined;
  deviceInfo: any;

  constructor(
    private cameraService: CameraService,
    private locationService: LocationService,
    private deviceInfoService: DeviceInfoService
  ) {}

  async takePicture() {
    this.capturedImage = await this.cameraService.takePicture();
  }

  async getLocation() {
    try {
      this.locationError = undefined; // Reset error message
      const position = await this.locationService.getCurrentPosition();
      
      if (position && position.coords) {
        this.currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      }
    } catch (error: any) {
      this.locationError = error.message || 'Failed to get location';
      this.currentLocation = undefined;
      console.error('Location error:', error);
    }
  }

  async getDeviceInfo() {
    try {
      this.deviceInfo = await this.deviceInfoService.getDeviceInfo();
    } catch (error) {
      console.error('Error getting device info:', error);
    }
  }
}
