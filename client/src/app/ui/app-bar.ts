import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-bar',
  directives: [...ROUTER_DIRECTIVES],
  styles: [`
    @import 'https://fonts.googleapis.com/css?family=Exo|Montserrat|Source+Code+Pro';
    .app-bar {
      height: 65px;
      padding: 5px 30px;
      background-color: #FFC107;
      font-family: 'Source Code Pro', monospace;
      font-color: #001;

    }
    .logo {
      color: #212121;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
    }
    .link {
      color: #212121;
      font-size: 20px;
      font-weight: 400;
      cursor: pointer;
    }
    `],
  template: `
    <header class="app-bar row middle-xs">
      <span [routerLink]="['']" class="logo col-xs-7">
        CodeTodo.(xyz)
      </span>
      <nav class="col-xs-3">
        <div class="row middle-xs between-xs">
          <span [routerLink]="['', 'about']" class="link">About</span>
          <span (click)="signout()" class="link">Signout</span>
        </div>
      </nav>
      </header>

  `
})

export class AppBar {
  constructor(private authService: AuthService) {}

  signout() {
    this.authService.signout();
  }
}
