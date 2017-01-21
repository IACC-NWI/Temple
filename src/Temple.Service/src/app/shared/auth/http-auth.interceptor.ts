import { Injectable } from '@angular/core';
import { Http, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { AuthEventService } from './auth-event.service';
import { AuthError } from './auth.error';

@Injectable()
export class HttpAuthInterceptor extends Http {

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private authEventService: AuthEventService) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.getRequestOptionArgs(options).switchMap(ops => {
            return this.intercept(super.get(url, ops));
        }).catch(err => {
            console.log('The call is not authorized: ', err);
            return Observable.empty<Response>();
        });

    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.getRequestOptionArgs(options)
            .switchMap(ops => {
                return this.intercept(super.post(url, body, ops));
            });
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.getRequestOptionArgs(options).switchMap(ops => {
            return this.intercept(super.put(url, body, ops));
        });
    }

    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.getRequestOptionArgs(options).switchMap(ops => {
            return this.intercept(super.patch(url, body, ops));
        });
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.getRequestOptionArgs(options).switchMap(ops => {
            return this.intercept(super.delete(url, ops));
        });
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): Observable<RequestOptionsArgs> {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }


        return this.authEventService.getUser().map(user => {

            if (user != null && !user.expired) {
                options.headers.append('Authorization', 'Bearer ' + user.access_token);
                return options;
            } else {
                this.authEventService.authenticateUser();
                throw new AuthError('You are not authroized.');
            }
        });

    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            if (err.status === 401) {
                console.log('The call is not authorized.');
                // this.authEventService.authenticateUser();
                return Observable.empty<Response>();
            } else {
                return Observable.throw(err);
            }
        });

    }
}
