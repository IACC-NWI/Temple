import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { Member } from './member.model';

@Injectable()
export class MemberService {
    private templeService = 'http://localhost:30010/';

    constructor(private http: Http) { }

    getMember(memberId: string) {
        return this.http.get(this.templeService + 'api/temple/getMember/' + memberId)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateMember(member: Member) {
        return this.http.post(this.templeService + 'api/temple/updateMember', member)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'server error'));
    }
    addMember(member: Member) {
        return this.http.post(this.templeService + 'api/temple/addMember', member)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'server error'));
    }
}
