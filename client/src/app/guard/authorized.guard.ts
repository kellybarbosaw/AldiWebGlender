import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authorizedGuard: CanActivateFn = (route, state) => {

  const authorizedService = inject(LoginService)

  const Logged = authorizedService.validate();
  
    return Logged;
};
