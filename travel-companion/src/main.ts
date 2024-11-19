import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
// Import PWA Elements - these provide UI components for native features
// PWA Elements are needed when running on the web to provide a native-like experience
// They create fallback UI for Capacitor plugins (like Camera) when running in a browser
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Define custom elements before bootstrapping the app
// This ensures that the Camera UI components are available when needed
// Without this, the camera interface wouldn't show up in web browsers
defineCustomElements(window).then(() => {
  bootstrapApplication(AppComponent, {
    providers: [
      // Configure Angular to use Ionic's route strategy
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      // Initialize Ionic
      provideIonicAngular(),
      // Set up routing with preloading strategy
      provideRouter(routes, withPreloading(PreloadAllModules)),
    ],
  });
});
