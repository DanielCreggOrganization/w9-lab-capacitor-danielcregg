import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

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
