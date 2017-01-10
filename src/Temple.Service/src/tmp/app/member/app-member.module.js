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
var forms_1 = require('@angular/forms');
var primeng_1 = require('primeng/primeng');
var app_member_routes_1 = require('./app-member.routes');
var member_component_1 = require('./member.component');
var member_service_1 = require('./member.service');
var AppMemberModule = (function () {
    function AppMemberModule() {
    }
    AppMemberModule = __decorate([
        core_1.NgModule({
            imports: [
                primeng_1.InputTextModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                primeng_1.ButtonModule,
                router_1.RouterModule.forChild(app_member_routes_1.AppMemberRoutes)],
            declarations: [member_component_1.MemberComponent],
            providers: [
                member_service_1.MemberService
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], AppMemberModule);
    return AppMemberModule;
}());
exports.AppMemberModule = AppMemberModule;

//# sourceMappingURL=app-member.module.js.map
