import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { GrowlModule, } from 'primeng/primeng';

import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { AppHomeModule } from './home/app-home.module';
import { AppMemberModule } from './member/app-member.module';
import { AppAdminModule } from './admin/app-admin.module';
import { AppOfferedServicesModule } from './offeredservices/app-offered-services.module';
const routing = RouterModule.forRoot(AppRoutes);

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        routing,
        GrowlModule,
        FormsModule,
        ReactiveFormsModule,

        AppHomeModule,
        AppMemberModule,
        AppOfferedServicesModule,
        AppAdminModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    providers: []
})
export class AppModule {

}
