"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_1 = require('./app');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
// import {enableProdMode} from '@angular/core';
// enableProdMode();
platform_browser_dynamic_1.bootstrap(app_1.App, http_1.HTTP_PROVIDERS.concat([
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms(),
    router_1.provideRouter(app_1.routes),
    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
], app_1.providers));
//# sourceMappingURL=main.js.map