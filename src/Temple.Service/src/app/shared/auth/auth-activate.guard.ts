import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthEventService } from './auth-event.service';

@Injectable()
export class AuthActivateGuard implements CanActivate {

    constructor(private authEventService: AuthEventService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (window.location.hash) {
            console.log('redirect sign in');
            this.authEventService.redirectCallback();
        }

        return this.authEventService.isUserAuthenticated().map(isAuthenticated => {
            if (isAuthenticated) {
                return true;
            }

            console.log('You cannot navigate to this location. Please check your credentials.');

            this.authEventService.unauthorizedLocation = state.url;

            this.router.navigate(['/login', { autherror: 'NOT_AUTHENTICATED' }]);

            return false;
        });
    }
}
