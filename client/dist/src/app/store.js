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
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var core_1 = require('@angular/core');
require('rxjs/Rx');
var defaultState = {
    notes: [],
    user: {},
};
var _store = new BehaviorSubject_1.BehaviorSubject(defaultState);
var Store = (function () {
    function Store() {
        this._store = _store;
        this.changes = this._store.asObservable().distinctUntilChanged()
            .distinctUntilChanged()
            .do(function () { return console.log('changes'); });
    }
    Store.prototype.setState = function (state) {
        console.log('state set', state);
        this._store.next(state);
    };
    Store.prototype.getState = function () {
        return this._store.value;
    };
    Store.prototype.purge = function () {
        this._store.next(defaultState);
    };
    Store = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Store);
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=store.js.map