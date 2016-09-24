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
var core_1 = require('@angular/core');
var store_1 = require('../store');
var StoreHelper = (function () {
    function StoreHelper(store) {
        this.store = store;
    }
    StoreHelper.prototype.update = function (prop, state) {
        var currentState = this.store.getState();
        this.store.setState(Object.assign({}, currentState, (_a = {}, _a[prop] = state, _a)));
        var _a;
    };
    StoreHelper.prototype.add = function (prop, state) {
        var currentState = this.store.getState();
        var collection = currentState[prop];
        this.store.setState(Object.assign({}, currentState, (_a = {}, _a[prop] = [state.data].concat(collection), _a)));
        var _a;
    };
    StoreHelper.prototype.findAndUpdate = function (prop, state) {
        var currentState = this.store.getState();
        var collection = currentState[prop];
        this.store.setState(Object.assign({}, currentState, (_a = {}, _a[prop] = collection.map(function (item) {
            if (item.id !== state.id) {
                return item;
            }
            return Object.assign({}, item, state);
        }), _a)));
        var _a;
    };
    StoreHelper.prototype.findAndDelete = function (prop, id) {
        console.log(id);
        var currentState = this.store.getState();
        var collection = currentState[prop];
        this.store.setState(Object.assign({}, currentState, (_a = {}, _a[prop] = collection.filter(function (item) { return item._id != id; }), _a)));
        var _a;
    };
    StoreHelper = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [store_1.Store])
    ], StoreHelper);
    return StoreHelper;
}());
exports.StoreHelper = StoreHelper;
//# sourceMappingURL=store-helper.js.map