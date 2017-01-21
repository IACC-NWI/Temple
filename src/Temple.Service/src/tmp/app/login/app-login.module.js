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
var primeng_1 = require('primeng/primeng');
var app_login_routes_1 = require('./app-login.routes');
var login_component_1 = require('./login.component');
var AppLoginModule = (function () {
    function AppLoginModule() {
    }
    AppLoginModule = __decorate([
        core_1.NgModule({
            imports: [
                primeng_1.ButtonModule,
                router_1.RouterModule.forChild(app_login_routes_1.AppLoginRoutes)],
            declarations: [
                login_component_1.LoginComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppLoginModule);
    return AppLoginModule;
}());
exports.AppLoginModule = AppLoginModule;

//# sourceMappingURL=app-login.module.js.map
