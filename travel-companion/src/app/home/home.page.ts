import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { CameraService } from '../services/camera.service';
import { LocationService } from '../services/location.service';

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
    IonButton
  ],
})
export class HomePage {
  capturedImage: string | undefined;
  currentLocation: { latitude: number; longitude: number } | undefined;

  constructor(
    private cameraService: CameraService,
    private locationService: LocationService
  ) {}

  async takePicture() {
    this.capturedImage = await this.cameraService.takePicture();
  }

  async getLocation() {
    try {
      const position = await this.locationService.getCurrentPosition();
      console.log('Position received:', position); // Debug log
      
      if (position && position.coords) {
        this.currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        console.log('Current location set:', this.currentLocation); // Debug log
      } else {
        console.error('Invalid position object received');
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  }
}
