"use strict";
var services = require('./services');
var store_1 = require('./store');
var app_1 = require('./app');
exports.App = app_1.App;
var routes_ts_1 = require('./routes.ts');
exports.routes = routes_ts_1.routes;
var mapValuesToArray = function (obj) { return Object.keys(obj).map(function (key) { return obj[key]; }); };
exports.providers = [
    store_1.Store
].concat(mapValuesToArray(services));
//# sourceMappingURL=index.js.map