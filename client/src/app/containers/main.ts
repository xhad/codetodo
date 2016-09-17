import { Component } from '@angular/core';
import { AppBar } from '../ui/app-bar';
import { Notes } from './notes';

@Component({
	selector: 'main-container',
	directives: [
		AppBar,
		Notes
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
				<notes-container></notes-container>
			</main>
		</div>
	`
})

export class Main{}
