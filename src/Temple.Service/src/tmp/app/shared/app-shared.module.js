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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var primeng_1 = require('primeng/primeng');
var http_auth_interceptor_1 = require('./auth/http-auth.interceptor');
var auth_activate_guard_1 = require('./auth/auth-activate.guard');
var auth_event_service_1 = require('./auth/auth-event.service');
var oidc_service_1 = require('./auth/oidc.service');
var AppSharedModule = (function () {
    function AppSharedModule(parentModule) {
        if (parentModule) {
            throw new Error('AppSharedModule is already loaded. Import it in the AppModule only');
        }
    }
    AppSharedModule.forRoot = function () {
        return {
            ngModule: AppSharedModule
        };
    };
    AppSharedModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, primeng_1.MenuModule, primeng_1.AutoCompleteModule, router_1.RouterModule.forChild([])],
            declarations: [],
            providers: [
                oidc_service_1.OidcService,
                auth_event_service_1.AuthEventService,
                auth_activate_guard_1.AuthActivateGuard,
                {
                    provide: http_1.Http,
                    useFactory: function (xhrBackend, requestOptions, authEventService) {
                        return new http_auth_interceptor_1.HttpAuthInterceptor(xhrBackend, requestOptions, authEventService);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions, auth_event_service_1.AuthEventService]
                }
            ],
            exports: []
        }),
        __param(0, core_1.Optional()),
        __param(0, core_1.SkipSelf()), 
        __metadata('design:paramtypes', [AppSharedModule])
    ], AppSharedModule);
    return AppSharedModule;
}());
exports.AppSharedModule = AppSharedModule;

//# sourceMappingURL=app-shared.module.js.map
