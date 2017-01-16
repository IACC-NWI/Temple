import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { PerformedServiceModel } from './performed-service.model';

@Injectable()
export class ServicesForMembersService {
    private templeService = 'http://localhost:30010/';

    constructor(private http: Http) { }

    getMember(memberId: string) {
        return this.http.get(this.templeService + 'api/temple/getMember/' + memberId)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getOfferedServices() {
        return this.http.get(this.templeService + 'api/temple/getServices')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getOfferedFestivals() {
        return this.http.get(this.templeService + 'api/temple/getFestivals')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    savePerformedService(model: PerformedServiceModel) {
        return this.http.post(this.templeService + 'api/temple/addPerformedService', model)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
