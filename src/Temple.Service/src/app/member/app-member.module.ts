import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule, ButtonModule } from 'primeng/primeng';
import { AppMemberRoutes } from './app-member.routes';
import { MemberComponent } from './member.component';
import { MemberService } from './member.service';

@NgModule({
    imports: [
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        RouterModule.forChild(AppMemberRoutes)],
    declarations: [MemberComponent],
    providers: [
        MemberService
    ],
})
export class AppMemberModule {

}
