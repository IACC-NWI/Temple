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
var forms_1 = require('@angular/forms');
var admin_service_1 = require('./admin.service');
var AdminComponent = (function () {
    function AdminComponent(formBuilder, adminService) {
        this.formBuilder = formBuilder;
        this.adminService = adminService;
        this.selectedFestival = '';
        this.selectedServices = 0;
    }
    AdminComponent.prototype.ngOnInit = function () {
        this.festivalForm = this.formBuilder.group({
            Id: [0],
            Name: ['', [forms_1.Validators.required]]
        });
        this.serviceForm = this.formBuilder.group({
            Id: [0],
            Name: ['', [forms_1.Validators.required]],
            TypeOfService: ['', [forms_1.Validators.required]],
            SuggestedDonation: ['', [forms_1.Validators.required]],
            Description: ['', [forms_1.Validators.required]]
        });
        this.getFestivals();
        this.getServices();
    };
    AdminComponent.prototype.saveFestival = function (model, isValid) {
        var _this = this;
        if (isValid) {
            this.adminService.saveFestival(model).subscribe(function (t) { return _this.availableFestivals.push({ label: t.Name, value: t.Name }); });
        }
    };
    AdminComponent.prototype.getFestivals = function () {
        var _this = this;
        this.availableFestivals = new Array();
        this.adminService.getFestivals()
            .subscribe(function (t) {
            t.forEach(function (m) { _this.availableFestivals.push({ label: m.Name, value: m.Name }); });
        });
    };
    AdminComponent.prototype.saveService = function (model, isValid) {
        var _this = this;
        if (isValid) {
            this.adminService.saveService(model)
                .subscribe(function (t) { return _this.availableServices.push({ label: t.Name, value: t.Id }); });
        }
    };
    AdminComponent.prototype.getServices = function () {
        var _this = this;
        this.availableServices = new Array();
        this.adminService.getServices()
            .subscribe(function (t) {
            t.forEach(function (m) { _this.availableServices.push({ label: m.Name, value: m.Id }); });
        });
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'iacc-admin',
            templateUrl: 'app/admin/admin.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, admin_service_1.AdminService])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;

//# sourceMappingURL=admin.component.js.map
