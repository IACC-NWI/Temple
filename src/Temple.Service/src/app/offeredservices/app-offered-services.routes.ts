import { Routes } from '@angular/router';
import { ServicesForMembersComponent } from './servicesformembers/services-for-members.component';

export const AppOfferedServicesRoutes: Routes = [
    { path: 'servicesformembers/:memberId', component: ServicesForMembersComponent }
];
