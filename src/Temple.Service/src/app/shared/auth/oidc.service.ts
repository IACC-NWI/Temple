import { Injectable } from '@angular/core';
import { UserManager } from 'oidc-client';

declare var settings: any;

@Injectable()
export class OidcService {

    private userManager;
    private settings: any;

    constructor() {

        // Log.logger = console;

        this.settings = settings;
        this.userManager = new UserManager(this.settings);

    }

    getManager() {
        return this.userManager;
    }

}
