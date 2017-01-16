import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';

import { ServicesForMembersService } from './services-for-members.service';
import { OfferedServiceModel } from './offered-service.model';
import { PerformedServiceModel } from './performed-service.model';

@Component({
    selector: 'iacc-servicesformembers',
    templateUrl: 'app/offeredservices/servicesformembers/services-for-members.html'
})
export class ServicesForMembersComponent implements OnInit {
    performServiceForm: FormGroup;
    memberId: string;
    firstName: string;
    lastName: string;
    offeredFestivals: SelectItem[];
    offeredServices: SelectItem[];
    selectedService: OfferedServiceModel;
    suggestedDonation: number;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private serviceForMemberService: ServicesForMembersService) {
        this.offeredFestivals = new Array<SelectItem>();
        this.offeredServices = new Array<SelectItem>();
        this.selectedService = new OfferedServiceModel();
        this.suggestedDonation = 0;
        this.offeredFestivals.push({ label: ' -- Choose --', value: null});
        this.offeredServices.push({ label: '-- Choose -- ', value: null });
    }

    ngOnInit() {
        this.serviceForMemberService.getOfferedFestivals()
            .subscribe(festivals => {
                festivals.forEach(f => this.offeredFestivals.push({ label: f.Name, value: f.Name }));
                this.serviceForMemberService.getOfferedServices()
                    .subscribe(services => {
                        services.forEach(s => this.offeredServices.push({ label: s.Name, value: s }));
                    });
            });

        this.route.params.subscribe(params => {
            this.memberId = params['memberId'];
            this.firstName = params['firstName'];
            this.lastName = params['lastName'];

            this.performServiceForm = this.formBuilder.group({
                Id: [0],
                ExpectedDateOfOffering: ['', <any>Validators.required],
                MemberId: [this.memberId, <any>Validators.required],
                AmountDonated: [0, <any>Validators.required],
                SuggestedAmountForService: [0, <any>Validators.required],
                PerformedForFirstName: [this.firstName, <any>Validators.required],
                PerformedForLastName: [this.lastName, <any>Validators.required],
                ServiceType: ['', <any>Validators.required],
                ServiceName: ['', <any>Validators.required],
                Festival: ['', <any>Validators.required],
                Priest: ['']
            });
        });
    }

    onNewServiceSelected(event) {
        let svcName = <FormControl>this.performServiceForm.controls['ServiceName'];
        svcName.setValue(event.value.Name);
        let svcType = <FormControl>this.performServiceForm.controls['ServiceType'];
        svcType.setValue(event.value.TypeOfService);
        let suggestedDollars = <FormControl>this.performServiceForm.controls['SuggestedAmountForService'];
        suggestedDollars.setValue(event.value.SuggestedDonation);
        let yourDonation = <FormControl>this.performServiceForm.controls['AmountDonated'];
        this.suggestedDonation = event.value.SuggestedDonation;
        yourDonation.setValue(event.value.SuggestedDonation);
    }
    save(model: PerformedServiceModel, isValid: boolean) {
        this.serviceForMemberService.savePerformedService(model).subscribe(t => console.log(t));
    }
}
