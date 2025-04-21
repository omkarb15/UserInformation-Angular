import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';


  export const interceptorAuthInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getToken();
  
    // Don't add token for the login request
    if (token && !req.url.includes('/Login')) {
      const cloneReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(cloneReq);
    }
  
    return next(req);
  };
  