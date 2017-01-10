import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'iacc-home',
    templateUrl: 'app/home/home.html',
    styleUrls: [
        'app/home/home.css'
    ]
})
export class HomeComponent {
    memberId: string;
}