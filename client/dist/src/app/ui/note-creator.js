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
var color_picker_1 = require('./color-picker');
var NoteCreator = (function () {
    function NoteCreator() {
        this.createNote = new core_1.EventEmitter();
        this.colors = [
            '#42A5F5',
            '#26C6DA',
            '#66BB6A',
            '#D4E157',
            '#FFCA28',
            '#FF7043',
            '#BDBDBD',
            '#8D6E63',
            '#78909C'
        ];
        this.newNote = {
            title: '',
            value: '',
            color: 'white'
        };
        this.fullForm = false;
    }
    NoteCreator.prototype.onColorSelect = function (color) {
        this.newNote.color = color;
    };
    NoteCreator.prototype.onCreateNote = function () {
        console.log('submitted');
        var _a = this.newNote, title = _a.title, value = _a.value, color = _a.color;
        if (title && value) {
            this.createNote.emit({ title: title, value: value, color: color });
            this.reset();
        }
    };
    NoteCreator.prototype.reset = function () {
        this.newNote = {
            title: '',
            value: '',
            color: 'white'
        };
        this.fullForm = false;
    };
    NoteCreator.prototype.toggle = function (value) {
        this.fullForm = value;
    };
    NoteCreator.prototype.expand = function (o) {
        console.log(o);
    };
    NoteCreator.prototype.textAreaAdjust = function (o) {
        o.style.height = "1px";
        o.style.height = (25 + o.scrollHeight) + "px";
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NoteCreator.prototype, "createNote", void 0);
    NoteCreator = __decorate([
        core_1.Component({
            selector: 'note-creator',
            directives: [color_picker_1.ColorPicker],
            styles: ["\n  .note-creator {\n      padding: 20px;\n      background-color: white;\n      border-radius: 3px;\n    }\n    .title {\n      font-weight: bold;\n      color: rgba(0,0,0,0.8);\n    }\n    .full {\n      height: 100px;\n    }\ntextarea {\n    border: none;\n    overflow: hidden;\n    outline: none;\n    width: 100%;\n    -webkit-box-shadow: none;\n    -moz-box-shadow: none;\n    box-shadow: none;\n}\n  "],
            template: "\n  <div\n    class=\"note-creator shadow-2\"\n    [ngStyle]=\"{'background-color': newNote.color}\"\n  >\n    <form class=\"row\" (submit)=\"onCreateNote()\">\n      <input\n        type=\"text\"\n        [(ngModel)]=\"newNote.title\"\n        name=\"newNoteTitle\"\n        placeholder=\"Title\"\n        class=\"col-xs-10 title\"\n        *ngIf=\"fullForm\"\n      >\n      <textarea\n        [rows]=\"expand(o)\"\n        (focus)=\"toggle(true)\"\n        [(ngModel)]=\"newNote.value\"\n        name=\"newNoteValue\"\n        placeholder=\"description of code todo...\"\n        class=\"textarea\"\n\n      ></textarea>\n      <div class=\"actions col-xs-12 row between-xs\"\n      *ngIf=\"fullForm\"\n      >\n      <div class=\"col-xs-3\">\n      <color-picker\n        (selected)=\"onColorSelect($event)\"\n        [colors]=\"colors\"\n      ></color-picker>\n      </div>\n        <button\n          type=\"submit\"\n          class=\"btn-light\"\n         >\n          Done\n        </button>\n      </div>\n    </form>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], NoteCreator);
    return NoteCreator;
}());
exports.NoteCreator = NoteCreator;
//# sourceMappingURL=note-creator.js.map