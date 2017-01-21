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
var oidc_client_1 = require('oidc-client');
var OidcService = (function () {
    function OidcService() {
        // Log.logger = console;
        this.settings = settings;
        this.userManager = new oidc_client_1.UserManager(this.settings);
    }
    OidcService.prototype.getManager = function () {
        return this.userManager;
    };
    OidcService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], OidcService);
    return OidcService;
}());
exports.OidcService = OidcService;

//# sourceMappingURL=oidc.service.js.map
