"use strict";
var containers_1 = require('./containers');
var services_1 = require('./services');
exports.routes = [
    {
        path: '',
        component: containers_1.Main,
        canActivate: [services_1.AuthService],
        children: [
            { path: '', component: containers_1.Notes },
            { path: 'about', component: containers_1.About }
        ]
    },
    { path: 'auth', component: containers_1.Auth },
    { path: '**', redirectTo: '' }
];
//# sourceMappingURL=routes.js.map