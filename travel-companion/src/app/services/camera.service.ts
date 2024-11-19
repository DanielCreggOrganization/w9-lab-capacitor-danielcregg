// src/app/services/camera.service.ts
import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  constructor() { }

  async takePicture() {
    try {
      // In browser, this uses navigator.mediaDevices.getUserMedia()
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });
      
      return image.webPath;
    } catch (error) {
      console.error('Error taking photo:', error);
      throw error;
    }
  }
}