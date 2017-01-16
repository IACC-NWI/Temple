import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


import { Member } from './member.model';
import { MemberService } from './member.service';

@Component({
    selector: 'iacc-member',
    templateUrl: 'app/member/member.html'
})
export class MemberComponent implements OnInit {
    public memberForm: FormGroup;
    public memberId: string;
    memberNotFound: boolean;
    mbr: Member;
    constructor(private route: ActivatedRoute,
        private router: Router, private formBuilder: FormBuilder,
        private memberService: MemberService) {
    }

    ngOnInit() {
        this.memberNotFound = true;
        this.mbr = new Member();
        this.route.params.subscribe(params => {
            this.memberId = params['memberId'];
            this.memberForm = this.formBuilder.group({
                MemberId: [this.memberId, [<any>Validators.required, <any>Validators.minLength(10)]],
                FirstName: ['', [<any>Validators.required]],
                LastName: ['', [<any>Validators.required]],
                AddressLine1: ['', [<any>Validators.required]],
                AddressLine2: [''],
                City: ['', [<any>Validators.required]],
                State: ['', [<any>Validators.required]],
                Zip: ['', [<any>Validators.required]],
                FamilySize: ['', [<any>Validators.required]],
                MemberNotFound: [true]
            });
            this.memberService.getMember(this.memberId).subscribe(data => {
                    this.memberNotFound = data.MemberNotFound;

                    this.mbr.AddressLine1 = data.AddressLine1;
                    this.mbr.AddressLine2 = data.AddressLine2;
                    this.mbr.City = data.City;
                    this.mbr.FamilySize = data.FamilySize;
                    this.mbr.FirstName = data.FirstName;
                    this.mbr.LastName = data.LastName;
                    this.mbr.MemberId = data.MemberId;
                    this.mbr.State = data.State;
                    this.mbr.Zip = data.Zip;
                    this.mbr.MemberNotFound = data.MemberNotFound;

                    let MemberId = <FormControl>this.memberForm.controls['MemberId'];
                    let FirstName = <FormControl>this.memberForm.controls['FirstName'];
                    let LastName = <FormControl>this.memberForm.controls['LastName'];
                    let AddressLine1 = <FormControl>this.memberForm.controls['AddressLine1'];
                    let AddressLine2 = <FormControl>this.memberForm.controls['AddressLine2'];
                    let City = <FormControl>this.memberForm.controls['City'];
                    let State = <FormControl>this.memberForm.controls['State'];
                    let Zip = <FormControl>this.memberForm.controls['Zip'];
                    let FamilySize = <FormControl>this.memberForm.controls['FamilySize'];
                    let MemberNotFound = <FormControl>this.memberForm.controls['MemberNotFound'];

                    MemberId.setValue(this.mbr.MemberId);

                    AddressLine1.setValue(this.mbr.AddressLine1);
                    AddressLine2.setValue(this.mbr.AddressLine2);
                    City.setValue(this.mbr.City);
                    FamilySize.setValue(this.mbr.FamilySize);
                    FirstName.setValue(this.mbr.FirstName);
                    LastName.setValue(this.mbr.LastName);
                    MemberId.setValue(this.mbr.MemberId);
                    State.setValue(this.mbr.State);
                    Zip.setValue(this.mbr.Zip);
                    MemberNotFound.setValue(this.mbr.MemberNotFound);

                }
            );
        });
    }

    save(model: Member, isValid: boolean) {
        if (model.MemberNotFound) {
            this.memberService.addMember(model).subscribe(data => {
                this.memberNotFound = data.MemberNotFound;

                this.mbr.AddressLine1 = data.AddressLine1;
                this.mbr.AddressLine2 = data.AddressLine2;
                this.mbr.City = data.City;
                this.mbr.FamilySize = data.FamilySize;
                this.mbr.FirstName = data.FirstName;
                this.mbr.LastName = data.LastName;
                this.mbr.MemberId = data.MemberId;
                this.mbr.State = data.State;
                this.mbr.Zip = data.Zip;
                this.mbr.MemberNotFound = data.MemberNotFound;
            });
        } else {
            this.memberService.updateMember(model).subscribe(data => {
                this.memberNotFound = data.MemberNotFound;

                this.mbr.AddressLine1 = data.AddressLine1;
                this.mbr.AddressLine2 = data.AddressLine2;
                this.mbr.City = data.City;
                this.mbr.FamilySize = data.FamilySize;
                this.mbr.FirstName = data.FirstName;
                this.mbr.LastName = data.LastName;
                this.mbr.MemberId = data.MemberId;
                this.mbr.State = data.State;
                this.mbr.Zip = data.Zip;
                this.mbr.MemberNotFound = data.MemberNotFound;
            });
        }

    }
}
