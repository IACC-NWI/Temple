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
var member_model_1 = require('./member.model');
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
        this.memberNotFound = true;
        this.mbr = new member_model_1.Member();
        this.route.params.subscribe(function (params) {
            _this.memberId = params['memberId'];
            _this.memberForm = _this.formBuilder.group({
                MemberId: [_this.memberId, [forms_1.Validators.required, forms_1.Validators.minLength(10)]],
                FirstName: ['', [forms_1.Validators.required]],
                LastName: ['', [forms_1.Validators.required]],
                AddressLine1: ['', [forms_1.Validators.required]],
                AddressLine2: [''],
                City: ['', [forms_1.Validators.required]],
                State: ['', [forms_1.Validators.required]],
                Zip: ['', [forms_1.Validators.required]],
                FamilySize: ['', [forms_1.Validators.required]],
                MemberNotFound: [true]
            });
            _this.memberService.getMember(_this.memberId).subscribe(function (data) {
                _this.memberNotFound = data.MemberNotFound;
                _this.mbr.AddressLine1 = data.AddressLine1;
                _this.mbr.AddressLine2 = data.AddressLine2;
                _this.mbr.City = data.City;
                _this.mbr.FamilySize = data.FamilySize;
                _this.mbr.FirstName = data.FirstName;
                _this.mbr.LastName = data.LastName;
                _this.mbr.MemberId = data.MemberId;
                _this.mbr.State = data.State;
                _this.mbr.Zip = data.Zip;
                _this.mbr.MemberNotFound = data.MemberNotFound;
                var MemberId = _this.memberForm.controls['MemberId'];
                var FirstName = _this.memberForm.controls['FirstName'];
                var LastName = _this.memberForm.controls['LastName'];
                var AddressLine1 = _this.memberForm.controls['AddressLine1'];
                var AddressLine2 = _this.memberForm.controls['AddressLine2'];
                var City = _this.memberForm.controls['City'];
                var State = _this.memberForm.controls['State'];
                var Zip = _this.memberForm.controls['Zip'];
                var FamilySize = _this.memberForm.controls['FamilySize'];
                var MemberNotFound = _this.memberForm.controls['MemberNotFound'];
                MemberId.setValue(_this.mbr.MemberId);
                AddressLine1.setValue(_this.mbr.AddressLine1);
                AddressLine2.setValue(_this.mbr.AddressLine2);
                City.setValue(_this.mbr.City);
                FamilySize.setValue(_this.mbr.FamilySize);
                FirstName.setValue(_this.mbr.FirstName);
                LastName.setValue(_this.mbr.LastName);
                MemberId.setValue(_this.mbr.MemberId);
                State.setValue(_this.mbr.State);
                Zip.setValue(_this.mbr.Zip);
                MemberNotFound.setValue(_this.mbr.MemberNotFound);
            });
        });
    };
    MemberComponent.prototype.save = function (model, isValid) {
        var _this = this;
        if (model.MemberNotFound) {
            this.memberService.addMember(model).subscribe(function (data) {
                _this.memberNotFound = data.MemberNotFound;
                _this.mbr.AddressLine1 = data.AddressLine1;
                _this.mbr.AddressLine2 = data.AddressLine2;
                _this.mbr.City = data.City;
                _this.mbr.FamilySize = data.FamilySize;
                _this.mbr.FirstName = data.FirstName;
                _this.mbr.LastName = data.LastName;
                _this.mbr.MemberId = data.MemberId;
                _this.mbr.State = data.State;
                _this.mbr.Zip = data.Zip;
                _this.mbr.MemberNotFound = data.MemberNotFound;
            });
        }
        else {
            this.memberService.updateMember(model).subscribe(function (data) {
                _this.memberNotFound = data.MemberNotFound;
                _this.mbr.AddressLine1 = data.AddressLine1;
                _this.mbr.AddressLine2 = data.AddressLine2;
                _this.mbr.City = data.City;
                _this.mbr.FamilySize = data.FamilySize;
                _this.mbr.FirstName = data.FirstName;
                _this.mbr.LastName = data.LastName;
                _this.mbr.MemberId = data.MemberId;
                _this.mbr.State = data.State;
                _this.mbr.Zip = data.Zip;
                _this.mbr.MemberNotFound = data.MemberNotFound;
            });
        }
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
