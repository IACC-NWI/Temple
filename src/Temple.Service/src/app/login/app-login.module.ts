import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/primeng';

import { AppLoginRoutes } from './app-login.routes';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        ButtonModule,
        RouterModule.forChild(AppLoginRoutes)],
    declarations: [
        LoginComponent
    ]

})
export class AppLoginModule { }
