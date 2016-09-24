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
var api_1 = require('./api');
var store_helper_1 = require('./store-helper');
var NoteService = (function () {
    function NoteService(apiService, storeHelper) {
        this.apiService = apiService;
        this.storeHelper = storeHelper;
    }
    NoteService.prototype.createNote = function (note) {
        var _this = this;
        var path = '/notes/create';
        return this.apiService.post(path, note)
            .do(function (savedNote) { return _this.storeHelper.add('notes', savedNote); });
    };
    NoteService.prototype.getNotes = function () {
        var _this = this;
        var path = '/notes/';
        return this.apiService.get(path)
            .do(function (res) { return _this.storeHelper.update('notes', res.data); });
    };
    NoteService.prototype.completeNote = function (note) {
        var _this = this;
        var path = '/notes/complete';
        return this.apiService.post(path, note)
            .do(function (res) { return _this.storeHelper.findAndDelete('notes', note._id); });
    };
    NoteService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [api_1.ApiService, store_helper_1.StoreHelper])
    ], NoteService);
    return NoteService;
}());
exports.NoteService = NoteService;
//# sourceMappingURL=notes.js.map