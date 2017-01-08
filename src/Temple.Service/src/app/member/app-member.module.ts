import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule, ButtonModule } from 'primeng/primeng';
import { AppMemberRoutes } from './app-member.routes';
import { MemberComponent } from './member.component';

@NgModule({
    imports: [
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        RouterModule.forChild(AppMemberRoutes)],
    declarations: [MemberComponent]
})
export class AppMemberModule {

}
