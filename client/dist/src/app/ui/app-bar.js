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
var router_1 = require('@angular/router');
var auth_1 = require('../services/auth');
var AppBar = (function () {
    function AppBar(authService) {
        this.authService = authService;
    }
    AppBar.prototype.signout = function () {
        this.authService.signout();
    };
    AppBar = __decorate([
        core_1.Component({
            selector: 'app-bar',
            directives: router_1.ROUTER_DIRECTIVES.slice(),
            styles: ["\n    @import 'https://fonts.googleapis.com/css?family=Exo|Montserrat|Source+Code+Pro';\n    .app-bar {\n      height: 65px;\n      padding: 30px;\n      background-color: #FFC400;\n      font-family: 'Source Code Pro', monospace;\n      font-color: #001;\n      margin-bottom: 5px;\n      z-index: 2;\n    }\n    .logo {\n      color: #212121;\n      font-size: 20px;\n      font-weight: bold;\n\n    }\n    .link {\n      color: #212121;\n      font-size: 20px;\n      font-weight: 400;\n      cursor: pointer;\n    }\n\n    "],
            template: "\n    <div class=\"app-bar row middle-xs shadow-2\">\n      <span [routerLink]=\"['']\" class=\"logo col-xs-9\">\n        CodeTodo.(xyz)\n      </span>\n      <nav class=\"col-xs-2 \">\n\n          <!--<span [routerLink]=\"['', 'about']\" class=\"link\">About</span>-->\n          <span (click)=\"signout()\" class=\"btn link\">Signout</span>\n\n      </nav>\n      </div>\n\n\n  "
        }), 
        __metadata('design:paramtypes', [auth_1.AuthService])
    ], AppBar);
    return AppBar;
}());
exports.AppBar = AppBar;
//# sourceMappingURL=app-bar.js.map