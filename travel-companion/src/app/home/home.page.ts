import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';
import { CameraService } from '../services/camera.service';
import { LocationService } from '../services/location.service';
import { DeviceInfoService } from '../services/device-info.service';
import { NetworkService } from '../services/network.service';
import { TextToSpeechService } from '../services/text-to-speech.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonText,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonInput
  ],
})
export class HomePage {
  capturedImage: string | undefined;
  currentLocation: { latitude: number; longitude: number } | undefined;
  locationError: string | undefined;
  deviceInfo: any;
  networkStatus: any;
  isConnected: boolean = false;
  textToSpeak: string = '';

  constructor(
    private cameraService: CameraService,
    private locationService: LocationService,
    private deviceInfoService: DeviceInfoService,
    private networkService: NetworkService,
    private ttsService: TextToSpeechService
  ) {
    this.initializeNetworkStatus();
  }

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

  private async initializeNetworkStatus() {
    // Subscribe to network status changes
    this.networkService.networkStatus$.subscribe(connected => {
      this.isConnected = connected;
    });
  }

  async checkNetworkStatus() {
    this.networkStatus = await this.networkService.getCurrentNetworkStatus();
  }

  async speakText() {
    try {
      await this.ttsService.speak(this.textToSpeak);
    } catch (error) {
      console.error('Error in text-to-speech:', error);
    }
  }
}
