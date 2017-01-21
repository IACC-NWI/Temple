import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthActivateGuard } from 'app-shared';
// import { ServicesForMembersComponent } from './servicesformembers/services-for-members.component';

export const AppAdminRoutes: Routes = [
    { path: 'admin', component: AdminComponent, canActivate: [AuthActivateGuard]  }
];
