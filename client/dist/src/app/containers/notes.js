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
var ui_1 = require('../ui');
var services_1 = require('../services');
var store_1 = require('../store');
require('rxjs/Rx');
var Notes = (function () {
    function Notes(noteService, store) {
        var _this = this;
        this.noteService = noteService;
        this.store = store;
        this.notes = [];
        this.store.changes.pluck('notes')
            .subscribe(function (notes) { return _this.notes = notes; });
        this.noteService.getNotes()
            .subscribe();
    }
    Notes.prototype.ngOnDestroy = function () {
        console.log('destroyed');
    };
    Notes.prototype.onNoteChecked = function (note) {
        this.noteService.completeNote(note)
            .subscribe();
    };
    Notes.prototype.onCreateNote = function (note) {
        this.noteService.createNote(note)
            .subscribe();
    };
    Notes = __decorate([
        core_1.Component({
            selector: 'notes-container',
            directives: [
                ui_1.NoteCard,
                ui_1.NoteCreator
            ],
            styles: ["\n    .notes {\n      padding-top: 50px;\n    }\n    .creator {\n      margin-bottom: 40px;\n    }\n  "],
            template: "\n    <div class=\"row center-xs notes\">\n      <div class=\"col-xs-10 col-sm-8 col-md-9 creator\">\n        <note-creator (createNote)=\"onCreateNote($event)\"></note-creator>\n      </div>\n      <div class=\"notes col-xs-10\">\n        <div class=\"row pull-left\">\n          <note-card\n          class=\"col-xs-12 col-sm-6 col-md-4\"\n          [note]=\"note\"\n          *ngFor=\"let note of notes; let i = index;\"\n          (checked)=\"onNoteChecked($event, i)\"\n        >\n        </note-card>\n        </div>\n        </div>\n      </div>\n  "
        }), 
        __metadata('design:paramtypes', [services_1.NoteService, store_1.Store])
    ], Notes);
    return Notes;
}());
exports.Notes = Notes;
//# sourceMappingURL=notes.js.map