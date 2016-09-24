import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-bar',
  directives: [...ROUTER_DIRECTIVES],
  styles: [`
    @import 'https://fonts.googleapis.com/css?family=Exo|Montserrat|Source+Code+Pro';
    .app-bar {
      position: relative;
      margin-top: 0;
      height: 65px;
      padding: 30px;
      background-color: #FFC107;
      font-family: 'Source Code Pro', monospace;
      font-color: #001;
      margin-bottom: 5px;
      z-index: 2;
    }
    .logo {
      color: #212121;
      font-size: 20px;
      font-weight: bold;

    }
    .link {
      color: #212121;
      font-size: 20px;
      font-weight: 400;
      cursor: pointer;
    }

    `],
  template: `
    <header class="app-bar row middle-xs shadow-2">
      <span [routerLink]="['']" class="logo col-xs-8">
        CodeTodo.(xyz)
      </span>
      <nav class="col-xs-2 ">

          <!--<span [routerLink]="['', 'about']" class="link">About</span>-->
          <span (click)="signout()" class="btn link">Signout</span>

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
