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
    constructor(private route: ActivatedRoute,
        private router: Router, private formBuilder: FormBuilder,
        private memberService: MemberService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.memberId = params['memberId'];
            this.memberService.getMember(this.memberId).subscribe(data => console.log(data));
            this.memberForm = this.formBuilder.group({
                MemberId: [this.memberId, [<any>Validators.required, <any>Validators.minLength(10)]],
                FirstName: ['', [<any>Validators.required]],
                LastName: ['', [<any>Validators.required]],
                AddressLine1: ['', [<any>Validators.required]],
                AddressLine2: ['', [<any>Validators.required]],
                City: ['', [<any>Validators.required]],
                State: ['', [<any>Validators.required]],
                Zip: ['', [<any>Validators.required]],
                FamilySize: ['', [<any>Validators.required]]
            });
        });
        

    }

    save(model: Member, isValid: boolean) {
        this.memberService.updateMember(model).subscribe(t => console.log(t));
    }
}
