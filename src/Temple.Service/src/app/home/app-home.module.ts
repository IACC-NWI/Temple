import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule, ButtonModule } from 'primeng/primeng';
import { AppHomeRoutes } from './app-home.routes';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        RouterModule.forChild(AppHomeRoutes)],
    declarations: [ HomeComponent ]
})
export class AppHomeModule {

}
