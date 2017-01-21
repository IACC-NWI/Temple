"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/empty');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/catch');
var auth_event_service_1 = require('./auth-event.service');
var auth_error_1 = require('./auth.error');
var HttpAuthInterceptor = (function (_super) {
    __extends(HttpAuthInterceptor, _super);
    function HttpAuthInterceptor(backend, defaultOptions, authEventService) {
        _super.call(this, backend, defaultOptions);
        this.authEventService = authEventService;
    }
    HttpAuthInterceptor.prototype.request = function (url, options) {
        return _super.prototype.request.call(this, url, options);
    };
    HttpAuthInterceptor.prototype.get = function (url, options) {
        var _this = this;
        return this.getRequestOptionArgs(options).switchMap(function (ops) {
            return _this.intercept(_super.prototype.get.call(_this, url, ops));
        }).catch(function (err) {
            console.log('The call is not authorized: ', err);
            return Observable_1.Observable.empty();
        });
    };
    HttpAuthInterceptor.prototype.post = function (url, body, options) {
        var _this = this;
        return this.getRequestOptionArgs(options)
            .switchMap(function (ops) {
            return _this.intercept(_super.prototype.post.call(_this, url, body, ops));
        });
    };
    HttpAuthInterceptor.prototype.put = function (url, body, options) {
        var _this = this;
        return this.getRequestOptionArgs(options).switchMap(function (ops) {
            return _this.intercept(_super.prototype.put.call(_this, url, body, ops));
        });
    };
    HttpAuthInterceptor.prototype.patch = function (url, body, options) {
        var _this = this;
        return this.getRequestOptionArgs(options).switchMap(function (ops) {
            return _this.intercept(_super.prototype.patch.call(_this, url, body, ops));
        });
    };
    HttpAuthInterceptor.prototype.delete = function (url, options) {
        var _this = this;
        return this.getRequestOptionArgs(options).switchMap(function (ops) {
            return _this.intercept(_super.prototype.delete.call(_this, url, ops));
        });
    };
    HttpAuthInterceptor.prototype.getRequestOptionArgs = function (options) {
        var _this = this;
        if (options == null) {
            options = new http_1.RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new http_1.Headers();
        }
        return this.authEventService.getUser().map(function (user) {
            if (user != null && !user.expired) {
                options.headers.append('Authorization', 'Bearer ' + user.access_token);
                return options;
            }
            else {
                _this.authEventService.authenticateUser();
                throw new auth_error_1.AuthError('You are not authroized.');
            }
        });
    };
    HttpAuthInterceptor.prototype.intercept = function (observable) {
        return observable.catch(function (err, source) {
            if (err.status === 401) {
                console.log('The call is not authorized.');
                // this.authEventService.authenticateUser();
                return Observable_1.Observable.empty();
            }
            else {
                return Observable_1.Observable.throw(err);
            }
        });
    };
    HttpAuthInterceptor = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.ConnectionBackend, http_1.RequestOptions, auth_event_service_1.AuthEventService])
    ], HttpAuthInterceptor);
    return HttpAuthInterceptor;
}(http_1.Http));
exports.HttpAuthInterceptor = HttpAuthInterceptor;

//# sourceMappingURL=http-auth.interceptor.js.map
