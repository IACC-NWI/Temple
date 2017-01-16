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
var services_for_members_service_1 = require('./services-for-members.service');
var offered_service_model_1 = require('./offered-service.model');
var ServicesForMembersComponent = (function () {
    function ServicesForMembersComponent(route, router, formBuilder, serviceForMemberService) {
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.serviceForMemberService = serviceForMemberService;
        this.offeredFestivals = new Array();
        this.offeredServices = new Array();
        this.selectedService = new offered_service_model_1.OfferedServiceModel();
        this.suggestedDonation = 0;
        this.offeredFestivals.push({ label: ' -- Choose --', value: null });
        this.offeredServices.push({ label: '-- Choose -- ', value: null });
    }
    ServicesForMembersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.serviceForMemberService.getOfferedFestivals()
            .subscribe(function (festivals) {
            festivals.forEach(function (f) { return _this.offeredFestivals.push({ label: f.Name, value: f.Name }); });
            _this.serviceForMemberService.getOfferedServices()
                .subscribe(function (services) {
                services.forEach(function (s) { return _this.offeredServices.push({ label: s.Name, value: s }); });
            });
        });
        this.route.params.subscribe(function (params) {
            _this.memberId = params['memberId'];
            _this.firstName = params['firstName'];
            _this.lastName = params['lastName'];
            _this.performServiceForm = _this.formBuilder.group({
                Id: [0],
                ExpectedDateOfOffering: ['', forms_1.Validators.required],
                MemberId: [_this.memberId, forms_1.Validators.required],
                AmountDonated: [0, forms_1.Validators.required],
                SuggestedAmountForService: [0, forms_1.Validators.required],
                PerformedForFirstName: [_this.firstName, forms_1.Validators.required],
                PerformedForLastName: [_this.lastName, forms_1.Validators.required],
                ServiceType: ['', forms_1.Validators.required],
                ServiceName: ['', forms_1.Validators.required],
                Festival: ['', forms_1.Validators.required],
                Priest: ['']
            });
        });
    };
    ServicesForMembersComponent.prototype.onNewServiceSelected = function (event) {
        var svcName = this.performServiceForm.controls['ServiceName'];
        svcName.setValue(event.value.Name);
        var svcType = this.performServiceForm.controls['ServiceType'];
        svcType.setValue(event.value.TypeOfService);
        var suggestedDollars = this.performServiceForm.controls['SuggestedAmountForService'];
        suggestedDollars.setValue(event.value.SuggestedDonation);
        var yourDonation = this.performServiceForm.controls['AmountDonated'];
        this.suggestedDonation = event.value.SuggestedDonation;
        yourDonation.setValue(event.value.SuggestedDonation);
    };
    ServicesForMembersComponent.prototype.save = function (model, isValid) {
        this.serviceForMemberService.savePerformedService(model).subscribe(function (t) { return console.log(t); });
    };
    ServicesForMembersComponent = __decorate([
        core_1.Component({
            selector: 'iacc-servicesformembers',
            templateUrl: 'app/offeredservices/servicesformembers/services-for-members.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, forms_1.FormBuilder, services_for_members_service_1.ServicesForMembersService])
    ], ServicesForMembersComponent);
    return ServicesForMembersComponent;
}());
exports.ServicesForMembersComponent = ServicesForMembersComponent;

//# sourceMappingURL=services-for-members.component.js.map
