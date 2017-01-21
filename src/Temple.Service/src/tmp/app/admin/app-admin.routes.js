"use strict";
var admin_component_1 = require('./admin.component');
var app_shared_1 = require('app-shared');
// import { ServicesForMembersComponent } from './servicesformembers/services-for-members.component';
exports.AppAdminRoutes = [
    { path: 'admin', component: admin_component_1.AdminComponent, canActivate: [app_shared_1.AuthActivateGuard] }
];

//# sourceMappingURL=app-admin.routes.js.map
