import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';

import { OidcService } from './oidc.service';

@Injectable()
export class AuthEventService {
    public authSubject: BehaviorSubject<any>;
    public unauthorizedLocation: string;
    private isAuthenticated: Observable<boolean>;
    private user: Observable<any>;

    constructor(private oidcService: OidcService, private router: Router) {


        this.authSubject = new BehaviorSubject({ event: 'LOGIN_STARTED', value: null });

        let mgr = this.oidcService.getManager();

        this.user = Observable.fromPromise(mgr.getUser()).map(user => {
            return user;
        });

        this.isAuthenticated = this.getUser().map(user => {

            if (user != null && !user.expired) {
                return true;
            }

            return false;
        });


        mgr.events.addAccessTokenExpiring(() => {
            console.log('Token expiring');
            // TODO: give usersers a warning
        });

        mgr.events.addSilentRenewError(e => {
            console.log('silent renew error', e.message);
        });

        mgr.events.addUserUnloaded(e => {
            console.log('AUTH-EVENT: user unloaded event');
            this.createAuthEvent(null);
        });

        mgr.events.addAccessTokenExpired(() => {
            console.log('AUTH-EVENT: token expired event');
            this.createAuthEvent(null);
            this.router.navigate(['/login', { autherror: 'AUTHENTICATION_EXPIRED' }]);
        });

        mgr.events.addUserLoaded((user) => {
            console.log('AUTH-EVENT: user loaded event');
            this.createAuthEvent(user);
        });


        // TODO: could not get the observable to resolve in the constructor
        this.user.toPromise().then((user) => {
            if (user != null && !user.expired) {
                mgr.events.load(user);
            }
        });
    }


    authenticateUser() {

        if (this.isUserAgentIE()) {
            this.redirectSignIn();
        } else {
            this.oidcService.getManager().signinPopup()
                .then(user => {
                    // will get the event instead of the callback
                    // this.createAuthEvent(user);
                })
                .catch(autherr => {
                    console.log('AUTH-EVENT: There was an error in the login popup: ', autherr);
                    // TODO: use redirect instead if error occurs
                    // this.oidcService.getManager().signinRedirect();
                });
        }
    }

    authenticateUserRedirectFallback() {

        if (this.isUserAgentIE()) {
            this.redirectSignIn();
        } else {

            this.oidcService.getManager().signinPopup()
                .then(user => {
                    // will get the event instead of the callback
                    if (this.unauthorizedLocation) {
                        this.router.navigateByUrl(this.unauthorizedLocation);
                        this.unauthorizedLocation = null;
                    } else {
                        this.router.navigate(['/']);
                    }
                })
                .catch(autherr => {
                    console.log('AUTH-EVENT: There was an error in the login popup: ', autherr);
                    //  use redirect instead if error occurs
                    this.redirectSignIn();
                });
        }
    }

    redirectSignIn() {
        if (this.unauthorizedLocation) {
            let location = this.unauthorizedLocation;
            this.unauthorizedLocation = null;
            this.oidcService.getManager().signinRedirect({ data: { loc: location } });
        } else {
            this.oidcService.getManager().signinRedirect();
        }
    }


    redirectCallback() {
        this.oidcService.getManager().signinRedirectCallback().then((data) => {
            if (data && data.state && typeof data.state.loc !== 'undefined' && data.state.loc) {
                this.router.navigateByUrl(data.state.loc);
            } else {
                this.router.navigate(['/']);
            }
        });
    }

    deauthenticateUser() {
        this.oidcService.getManager().signoutRedirect().then(resp => {
            this.createAuthEvent(null);
            console.log('AUTH-EVENT: signout initiated', resp);
        }).catch(err => {
            console.log('AUTH-EVENT: error signing out', err);
        });
    }

    authenticateUserAppOnly() {
        this.oidcService.getManager().getUser().then(user => { this.createAuthEvent(user); });
    }

    deauthenticateUserAppOnly() {
        this.createAuthEvent(null);
    }


    isUserAuthenticated(): Observable<boolean> {
        return this.isAuthenticated;
    }

    getUser(): Observable<any> {
        return this.user;
    }

    private createAuthEvent(value: any) {
        this.updateAuthFields(value);
        if (value != null && !value.expired) {
            this.authSubject.next({ event: 'LOGIN_CHANGED', value: value });
        } else {
            this.authSubject.next({ event: 'LOGIN_CHANGED', value: null });
        }
        console.log('Auth Event Change: ', value);
    };

    private updateAuthFields(user: any) {

        if (user != null && !user.expired) {
            this.isAuthenticated = Observable.of(true);
            this.user = Observable.of(user);
        } else {
            this.isAuthenticated = Observable.of(false);
            this.user = Observable.of(null);
        }
    }

    private isUserAgentIE(): boolean {
        let ua = window.navigator.userAgent;

        let msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            return true;
        }
        let trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number   let rv = ua.indexOf('rv:'); return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            return true;
        }

        let edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            return true;
        }

        return false;
    }

}
