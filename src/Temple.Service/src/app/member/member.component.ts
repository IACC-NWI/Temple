import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'iacc-member',
    templateUrl: 'app/member/member.html'
})
export class MemberComponent implements OnInit {
    constructor(private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            alert(params['memberId']);
        });
    }
}
