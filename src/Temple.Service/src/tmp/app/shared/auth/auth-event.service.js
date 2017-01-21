"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var Rx_1 = require('rxjs/Rx');
var oidc_service_1 = require('./oidc.service');
var AuthEventService = (function () {
    function AuthEventService(oidcService, router) {
        var _this = this;
        this.oidcService = oidcService;
        this.router = router;
        this.authSubject = new BehaviorSubject_1.BehaviorSubject({ event: 'LOGIN_STARTED', value: null });
        var mgr = this.oidcService.getManager();
        this.user = Rx_1.Observable.fromPromise(mgr.getUser()).map(function (user) {
            return user;
        });
        this.isAuthenticated = this.getUser().map(function (user) {
            if (user != null && !user.expired) {
                return true;
            }
            return false;
        });
        mgr.events.addAccessTokenExpiring(function () {
            console.log('Token expiring');
            // TODO: give usersers a warning
        });
        mgr.events.addSilentRenewError(function (e) {
            console.log('silent renew error', e.message);
        });
        mgr.events.addUserUnloaded(function (e) {
            console.log('AUTH-EVENT: user unloaded event');
            _this.createAuthEvent(null);
        });
        mgr.events.addAccessTokenExpired(function () {
            console.log('AUTH-EVENT: token expired event');
            _this.createAuthEvent(null);
            _this.router.navigate(['/login', { autherror: 'AUTHENTICATION_EXPIRED' }]);
        });
        mgr.events.addUserLoaded(function (user) {
            console.log('AUTH-EVENT: user loaded event');
            _this.createAuthEvent(user);
        });
        // TODO: could not get the observable to resolve in the constructor
        this.user.toPromise().then(function (user) {
            if (user != null && !user.expired) {
                mgr.events.load(user);
            }
        });
    }
    AuthEventService.prototype.authenticateUser = function () {
        if (this.isUserAgentIE()) {
            this.redirectSignIn();
        }
        else {
            this.oidcService.getManager().signinPopup()
                .then(function (user) {
                // will get the event instead of the callback
                // this.createAuthEvent(user);
            })
                .catch(function (autherr) {
                console.log('AUTH-EVENT: There was an error in the login popup: ', autherr);
                // TODO: use redirect instead if error occurs
                // this.oidcService.getManager().signinRedirect();
            });
        }
    };
    AuthEventService.prototype.authenticateUserRedirectFallback = function () {
        var _this = this;
        if (this.isUserAgentIE()) {
            this.redirectSignIn();
        }
        else {
            this.oidcService.getManager().signinPopup()
                .then(function (user) {
                // will get the event instead of the callback
                if (_this.unauthorizedLocation) {
                    _this.router.navigateByUrl(_this.unauthorizedLocation);
                    _this.unauthorizedLocation = null;
                }
                else {
                    _this.router.navigate(['/']);
                }
            })
                .catch(function (autherr) {
                console.log('AUTH-EVENT: There was an error in the login popup: ', autherr);
                //  use redirect instead if error occurs
                _this.redirectSignIn();
            });
        }
    };
    AuthEventService.prototype.redirectSignIn = function () {
        if (this.unauthorizedLocation) {
            var location_1 = this.unauthorizedLocation;
            this.unauthorizedLocation = null;
            this.oidcService.getManager().signinRedirect({ data: { loc: location_1 } });
        }
        else {
            this.oidcService.getManager().signinRedirect();
        }
    };
    AuthEventService.prototype.redirectCallback = function () {
        var _this = this;
        this.oidcService.getManager().signinRedirectCallback().then(function (data) {
            if (data && data.state && typeof data.state.loc !== 'undefined' && data.state.loc) {
                _this.router.navigateByUrl(data.state.loc);
            }
            else {
                _this.router.navigate(['/']);
            }
        });
    };
    AuthEventService.prototype.deauthenticateUser = function () {
        var _this = this;
        this.oidcService.getManager().signoutRedirect().then(function (resp) {
            _this.createAuthEvent(null);
            console.log('AUTH-EVENT: signout initiated', resp);
        }).catch(function (err) {
            console.log('AUTH-EVENT: error signing out', err);
        });
    };
    AuthEventService.prototype.authenticateUserAppOnly = function () {
        var _this = this;
        this.oidcService.getManager().getUser().then(function (user) { _this.createAuthEvent(user); });
    };
    AuthEventService.prototype.deauthenticateUserAppOnly = function () {
        this.createAuthEvent(null);
    };
    AuthEventService.prototype.isUserAuthenticated = function () {
        return this.isAuthenticated;
    };
    AuthEventService.prototype.getUser = function () {
        return this.user;
    };
    AuthEventService.prototype.createAuthEvent = function (value) {
        this.updateAuthFields(value);
        if (value != null && !value.expired) {
            this.authSubject.next({ event: 'LOGIN_CHANGED', value: value });
        }
        else {
            this.authSubject.next({ event: 'LOGIN_CHANGED', value: null });
        }
        console.log('Auth Event Change: ', value);
    };
    ;
    AuthEventService.prototype.updateAuthFields = function (user) {
        if (user != null && !user.expired) {
            this.isAuthenticated = Rx_1.Observable.of(true);
            this.user = Rx_1.Observable.of(user);
        }
        else {
            this.isAuthenticated = Rx_1.Observable.of(false);
            this.user = Rx_1.Observable.of(null);
        }
    };
    AuthEventService.prototype.isUserAgentIE = function () {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            return true;
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number   let rv = ua.indexOf('rv:'); return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            return true;
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            return true;
        }
        return false;
    };
    AuthEventService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [oidc_service_1.OidcService, router_1.Router])
    ], AuthEventService);
    return AuthEventService;
}());
exports.AuthEventService = AuthEventService;

//# sourceMappingURL=auth-event.service.js.map
