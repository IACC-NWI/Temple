import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthEventService } from 'app-shared';

@Component({
  selector: 'iacc-login',
  templateUrl: 'app/login/login.html',
})
export class LoginComponent {
  error: string;

  constructor(private authEventService: AuthEventService, private route: ActivatedRoute) {
  }

  login(event) {
    this.authEventService.authenticateUserRedirectFallback();
  }

  testAuth(event) {
    this.authEventService.authenticateUserAppOnly();
  }

  testDeauth(event) {
    this.authEventService.deauthenticateUserAppOnly();
  }
}
