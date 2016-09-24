"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var api_1 = require('./api');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var store_helper_1 = require('./store-helper');
var store_1 = require('../store');
require('rxjs/Rx');
var AuthService = (function () {
    function AuthService(router, apiService, storeHelper, store) {
        this.router = router;
        this.apiService = apiService;
        this.storeHelper = storeHelper;
        this.store = store;
        this.JWT_KEY = 'codetodo_token';
        if (window.localStorage.getItem(this.JWT_KEY)) {
            this.setJwt(window.localStorage.getItem(this.JWT_KEY));
            this.storeHelper.update('userId', this.userId);
        }
    }
    AuthService.prototype.setJwt = function (jwt) {
        window.localStorage.setItem(this.JWT_KEY, jwt);
        this.apiService.setHeaders({ Authorization: "" + jwt });
    };
    AuthService.prototype.userId = function () {
        return this.apiService.get('/auth/whoami');
    };
    AuthService.prototype.authenticate = function (path, creds) {
        var _this = this;
        return this.apiService.post("/auth/" + path, creds)
            .do(function (res) { return res.userId = _this.userId; })
            .do(function (res) { return _this.setJwt(res.token); })
            .do(function (res) { return _this.storeHelper.update('userId', res.userId); })
            .map(function (res) { return res.data; });
    };
    AuthService.prototype.signout = function () {
        window.localStorage.removeItem(this.JWT_KEY);
        this.store.purge();
        this.router.navigate(['', 'auth']);
    };
    AuthService.prototype.isAuthorized = function () {
        return Boolean(window.localStorage.getItem(this.JWT_KEY));
    };
    AuthService.prototype.canActivate = function () {
        var isAuth = this.isAuthorized();
        if (!isAuth) {
            this.router.navigate(['', 'auth']);
        }
        return isAuth;
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, api_1.ApiService, store_helper_1.StoreHelper, store_1.Store])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.js.map