import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { FestivalModel } from './festival.model'
import { ServiceModel } from './service.model';
@Injectable()
export class AdminService {
    private templeService = "http://localhost:30010/";

    constructor(private http: Http) { }

    saveFestival(model: FestivalModel) {
        return this.http.post(this.templeService + 'api/temple/addnewfestival', model)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getFestivals() {
        return this.http.get(this.templeService + 'api/temple/getFestivals')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    saveService(model: ServiceModel) {
        return this.http.post(this.templeService + 'api/temple/addNewService', model)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getServices() {
        return this.http.get(this.templeService + 'api/temple/getServices')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getServicesTypes() {
        return this.http.get(this.templeService + 'api/temple/getServiceTypes')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


}