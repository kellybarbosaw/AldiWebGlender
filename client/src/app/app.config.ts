import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HeaderInterceptor } from './services/header-interceptor';

export const TokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn)=>{
  let token = localStorage.getItem('authorization-token-access'); 
  if (token === null)token = 'null'

  const clonedReq = req.clone({
    setHeaders:{
      'authorization_token': token,
      Authorization: 'Bearer e4da68e48a89b5879b8847ee974987e0eb8db45a1afbee577cebe5cd65d3e52a'
    }
  });
  return next(clonedReq)
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideClientHydration(),
  provideHttpClient(withFetch(),
  withInterceptors([TokenInterceptor])),
  provideEnvironmentNgxMask(), provideAnimationsAsync()
]
};


