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
var auth_event_service_1 = require('./auth-event.service');
var AuthActivateGuard = (function () {
    function AuthActivateGuard(authEventService, router) {
        this.authEventService = authEventService;
        this.router = router;
    }
    AuthActivateGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        if (window.location.hash) {
            console.log('redirect sign in');
            this.authEventService.redirectCallback();
        }
        return this.authEventService.isUserAuthenticated().map(function (isAuthenticated) {
            if (isAuthenticated) {
                return true;
            }
            console.log('You cannot navigate to this location. Please check your credentials.');
            _this.authEventService.unauthorizedLocation = state.url;
            _this.router.navigate(['/login', { autherror: 'NOT_AUTHENTICATED' }]);
            return false;
        });
    };
    AuthActivateGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [auth_event_service_1.AuthEventService, router_1.Router])
    ], AuthActivateGuard);
    return AuthActivateGuard;
}());
exports.AuthActivateGuard = AuthActivateGuard;

//# sourceMappingURL=auth-activate.guard.js.map
