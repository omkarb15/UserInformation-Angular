/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; 
import { provideAnimations } from '@angular/platform-browser/animations'; // ✅ Import animations

bootstrapApplication(AppComponent, {
  ...appConfig, 
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations() // ✅ Add animations support
  ]
})
  .catch((err) => console.error(err));
