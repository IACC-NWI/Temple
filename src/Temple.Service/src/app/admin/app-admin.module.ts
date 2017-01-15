import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule, ButtonModule, ListboxModule, EditorModule } from 'primeng/primeng';

import { AppAdminRoutes } from './app-admin.routes';
import { AdminService } from './admin.service';
import { AdminComponent } from './admin.component';

@NgModule({
    imports: [
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        ListboxModule,
        EditorModule,
        RouterModule.forChild(AppAdminRoutes)],
    declarations: [AdminComponent],
    providers: [
        AdminService
    ],
})
export class AppAdminModule {

}
