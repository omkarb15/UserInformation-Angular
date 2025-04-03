import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inject the Router properly
  const userId = localStorage.getItem('userId');

  if (userId) {
    return true;
  } else {
    router.navigate(['/Login']);
    return false;
  }
};
