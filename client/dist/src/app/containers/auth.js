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
var auth_1 = require('../services/auth');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var Auth = (function () {
    function Auth(router, authService) {
        this.router = router;
        this.authService = authService;
        this.user = {
            email: '',
            password: ''
        };
        this.mode = 'signin';
        this.linkText = 'Don\'t have  an account?';
        this.titleText = 'Sign In';
    }
    Auth.prototype.changeMode = function () {
        if (this.mode === 'signin') {
            this.mode = 'signup';
            this.linkText = 'Already have an account?';
            this.titleText = 'Create a new Account';
        }
        else {
            this.mode = 'signin';
            this.linkText = 'Don\'t have an account?';
            this.titleText = 'Sign In';
        }
    };
    Auth.prototype.authenticate = function () {
        var _this = this;
        this.authService.authenticate(this.mode, this.user)
            .subscribe(function () { return _this.router.navigate(['']); });
    };
    Auth = __decorate([
        core_1.Component({
            selector: 'auth-container',
            styles: ["\n    .auth {\n          margin-top: 10%;\n          height: 100%;\n        }\n        input {\n          border-bottom: 1px solid lightgrey;\n        }\n        .ng-invalid.ng-dirty {\n          border-bottom: 1px solid red;\n        }\n        form {\n          width: 100%;\n          border-radius: 2px;\n          background-color: white;\n          padding: 20px;\n          height: 400px;\n        }\n        h3 {\n          text-transform: capitalize;\n        }\n        .inputs {\n          height: 100%;\n          position: relative;\n        }\n        .link {\n          color: #FFC107;\n          padding: 5px;\n          margin-left: 20px;\n          border: 2px solid #FFC107;\n          cursor: pointer;\n        }\n        .link:hover {/#/auth\n        .title {\n          font-size: 36px;\n          font-weight: 300;\n          text-transform: capitalize;\n        }\n        .email-error {\n          color: red;\n        }\n        .password-error {\n          color: red;\n          right: 20px;\n\n        }\n    "],
            template: "\n      <div class=\"auth row center-xs middle-xs\">\n          <form\n            class=\"col-xs-9 col-sm-7 col-md-6 shadow-2\"\n            (submit)=\"authenticate()\"\n            #authForm=\"ngForm\"\n          >\n            <div class=\"inputs row center-xs middle-xs\">\n              <h3 class=\"col-xs-9 title\">\n              {{ titleText }}\n              </h3>\n              <input\n                class=\"col-xs-9\"\n                type=\"email\"\n                name=\"email\"\n                required\n                [(ngModel)]=\"user.email\"\n                #email=\"ngModel\"\n                placeholder=\"email\"\n              >\n              <div class=\"email-error\"\n                [hidden]=\"email.valid || email.pristine\"\n              ></div>\n              <input\n                class=\"col-xs-9\"\n                type=\"password\"\n                name=\"password\"\n                required\n                #password\n                [(ngModel)]=\"user.password\"\n                placeholder=\"password\"\n              >\n              <div class=\"password-error\"\n                [hidden]=\"email.valid || email.pristine\"\n              ></div>\n              <div class=\"actions col-xs-12\">\n                <div class=\"row center-xs\">\n                  <button\n                  [disabled]=\"!authForm.form.valid\"\n                  type=\"submit\"\n                  class=\"btn-light\">\n                  {{ mode }}\n                  </button>\n                  <a (click)=\"changeMode()\" class=\"link\">\n                  {{ linkText }}\n                  </a>\n               </div>\n             </div>\n            </div>\n          </form>\n        </div>\n  "
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_1.AuthService])
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map