import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { StarRatingModule } from 'angular-star-rating';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), importProvidersFrom(StarRatingModule.forRoot())]
};

export const environment ={
  host: "https://fakestoreapi.com"
}