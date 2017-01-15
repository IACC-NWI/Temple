import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { SelectItem } from 'primeng/primeng';

import { AdminService } from './admin.service';
import { FestivalModel } from './festival.model';
import { ServiceModel } from './service.model';

@Component({
    selector: 'iacc-admin',
    templateUrl: 'app/admin/admin.html'
})
export class AdminComponent implements OnInit {
    festivalForm: FormGroup;
    serviceForm: FormGroup;
    availableFestivals: SelectItem[];
    availableServices: SelectItem[];
    selectedFestival: string;
    selectedServices: number;
    constructor(private formBuilder: FormBuilder,
        private adminService: AdminService) {
        this.selectedFestival = '';
        this.selectedServices = 0;
    }

    ngOnInit() {
        this.festivalForm = this.formBuilder.group({
            Id: [0],
            Name: ['', [<any>Validators.required]]
        });
        this.serviceForm = this.formBuilder.group({
            Id: [0],
            Name: ['', [<any>Validators.required]],
            TypeOfService: ['', [<any>Validators.required]],
            SuggestedDonation: ['', [<any>Validators.required]],
            Description: ['', [<any>Validators.required]]
        });
        this.getFestivals();
        this.getServices();
    }

    saveFestival(model: FestivalModel, isValid: boolean) {
        if (isValid) {
            this.adminService.saveFestival(model).subscribe(t => this.availableFestivals.push({label: t.Name, value: t.Name}));
        }
    }
    getFestivals() {
        this.availableFestivals = new Array<SelectItem>();
        this.adminService.getFestivals()
            .subscribe(t => {
                t.forEach(m => { this.availableFestivals.push({ label: m.Name, value: m.Name }); });
            });
    }
    saveService(model: ServiceModel, isValid: boolean) {
        if (isValid) {
            this.adminService.saveService(model)
                .subscribe(t => this.availableServices.push({ label: t.Name, value: t.Id }));
        }
    }
    getServices() {
        this.availableServices = new Array<SelectItem>();
        this.adminService.getServices()
            .subscribe(t => {
                t.forEach(m => { this.availableServices.push({ label: m.Name, value: m.Id }) });
            });
    }
}
