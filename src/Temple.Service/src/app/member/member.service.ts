import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { Member } from './member.model';

@Injectable()
export class MemberService {
    constructor(private http: Http) { }

    private templeService = "http://localhost:30010/";

    getMember(memberId: string) {
        return this.http.get(this.templeService + 'api/temple/getMember/' + memberId)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateMember(member: Member) {
        return this.http.post(this.templeService + 'api/temple/updateMember', member)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'server error'));
    }
}
