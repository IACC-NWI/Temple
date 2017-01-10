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
var member_service_1 = require('./member.service');
var MemberComponent = (function () {
    function MemberComponent(route, router, formBuilder, memberService) {
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.memberService = memberService;
    }
    MemberComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.memberId = params['memberId'];
            _this.memberService.getMember(_this.memberId).subscribe(function (data) { return console.log(data); });
            _this.memberForm = _this.formBuilder.group({
                MemberId: [_this.memberId, [forms_1.Validators.required, forms_1.Validators.minLength(10)]],
                FirstName: ['', [forms_1.Validators.required]],
                LastName: ['', [forms_1.Validators.required]],
                AddressLine1: ['', [forms_1.Validators.required]],
                AddressLine2: ['', [forms_1.Validators.required]],
                City: ['', [forms_1.Validators.required]],
                State: ['', [forms_1.Validators.required]],
                Zip: ['', [forms_1.Validators.required]],
                FamilySize: ['', [forms_1.Validators.required]]
            });
        });
    };
    MemberComponent.prototype.save = function (model, isValid) {
        this.memberService.updateMember(model).subscribe(function (t) { return console.log(t); });
    };
    MemberComponent = __decorate([
        core_1.Component({
            selector: 'iacc-member',
            templateUrl: 'app/member/member.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, forms_1.FormBuilder, member_service_1.MemberService])
    ], MemberComponent);
    return MemberComponent;
}());
exports.MemberComponent = MemberComponent;

//# sourceMappingURL=member.component.js.map
