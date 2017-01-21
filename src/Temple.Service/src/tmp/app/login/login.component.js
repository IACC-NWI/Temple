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
var app_shared_1 = require('app-shared');
var LoginComponent = (function () {
    function LoginComponent(authEventService, route) {
        this.authEventService = authEventService;
        this.route = route;
    }
    LoginComponent.prototype.login = function (event) {
        this.authEventService.authenticateUserRedirectFallback();
    };
    LoginComponent.prototype.testAuth = function (event) {
        this.authEventService.authenticateUserAppOnly();
    };
    LoginComponent.prototype.testDeauth = function (event) {
        this.authEventService.deauthenticateUserAppOnly();
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'iacc-login',
            templateUrl: 'app/login/login.html',
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof app_shared_1.AuthEventService !== 'undefined' && app_shared_1.AuthEventService) === 'function' && _a) || Object, router_1.ActivatedRoute])
    ], LoginComponent);
    return LoginComponent;
    var _a;
}());
exports.LoginComponent = LoginComponent;

//# sourceMappingURL=login.component.js.map
