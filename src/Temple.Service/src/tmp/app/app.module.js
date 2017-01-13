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
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var primeng_1 = require('primeng/primeng');
var app_routes_1 = require('./app.routes');
var app_component_1 = require('./app.component');
var app_home_module_1 = require('./home/app-home.module');
var app_member_module_1 = require('./member/app-member.module');
var app_offered_services_module_1 = require('./offeredservices/app-offered-services.module');
var routing = router_1.RouterModule.forRoot(app_routes_1.AppRoutes);
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                routing,
                primeng_1.GrowlModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                app_home_module_1.AppHomeModule,
                app_member_module_1.AppMemberModule,
                app_offered_services_module_1.AppOfferedServicesModule
            ],
            declarations: [
                app_component_1.AppComponent
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

//# sourceMappingURL=app.module.js.map
