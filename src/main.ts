/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; 
import { provideAnimations } from '@angular/platform-browser/animations';
import { interceptorAuthInterceptor } from './app/interceptor-auth.interceptor';

bootstrapApplication(AppComponent, {
  ...appConfig, 
  providers: [
    provideHttpClient(
      withInterceptors([
        interceptorAuthInterceptor
      ])
    ),
    provideRouter(routes),
    provideAnimations()
  ]
})
.catch((err) => console.error(err));
