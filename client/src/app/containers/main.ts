import { Component } from '@angular/core';
import { AppBar } from '../ui/app-bar';
import { Notes } from './notes';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
	selector: 'main-container',
	directives: [
		AppBar,
		Notes,
		...ROUTER_DIRECTIVES
	],
	styles: [`
		@import 'https://fonts.googleapis.com/css?family=Exo';
		.main {
			font-family: 'Exo';
		}
		`],
	template: `
		<div>
			<app-bar></app-bar>
			<main class="main">
				<router-outlet></router-outlet>
			</main>
		</div>
	`
})

export class Main{}
