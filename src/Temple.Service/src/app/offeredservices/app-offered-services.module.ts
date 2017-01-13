import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule, ButtonModule } from 'primeng/primeng';

import { AppOfferedServicesRoutes } from './app-offered-services.routes';
import { ServicesForMembersComponent } from './servicesformembers/services-for-members.component';
import { ServicesForMembersService } from './servicesformembers/services-for-members.service';

@NgModule({
    imports: [
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        RouterModule.forChild(AppOfferedServicesRoutes)],
    declarations: [ServicesForMembersComponent],
    providers: [
        ServicesForMembersService
    ],
})
export class AppOfferedServicesModule {

}
