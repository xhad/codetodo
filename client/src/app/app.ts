import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {enableProdMode} from '@angular/core';
enableProdMode();

@Component({
	selector: 'app',
	directives: [
		...ROUTER_DIRECTIVES
	],
	template: `
		<div>
			<router-outlet></router-outlet>
		</div>
	`
})

export class App{}
