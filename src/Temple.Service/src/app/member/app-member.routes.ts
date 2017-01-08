import { Routes } from '@angular/router';
import { MemberComponent } from './member.component';

export const AppMemberRoutes: Routes = [
	{ path: 'member/:memberId', component: MemberComponent }
]
