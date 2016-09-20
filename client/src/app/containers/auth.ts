import { AuthService } from '../services/auth';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'auth-container',
    styles: [`
    .auth {
          margin-top: 10%;
          height: 100%;
        }
        input {
          border-bottom: 1px solid lightgrey;
        }
        .ng-invalid.ng-dirty {
          border-bottom: 1px solid red;
        }
        form {
          width: 100%;
          border-radius: 2px;
          background-color: white;
          padding: 20px;
          height: 400px;
        }
        .inputs {
          height: 100%;
          position: relative;
        }
        .link {
          color: #FFC107;
        }
        .link:hover {/#/auth
        .title {
          font-size: 36px;
          font-weight: 300;
          text-transform: capitalize;
        }
        .email-error {
          color: red;
        }
        .password-error {
          color: red;
          right: 20px;

        }
    `],
    template: `
      <div class="auth row center-xs middle-xs">
          <form
            class="col-xs-9 col-sm-7 col-md-6 shadow-2"
            (submit)="authenticate()"
            #authForm="ngForm"
          >
            <div class="inputs row center-xs middle-xs">
              <h3 class="col-xs-9 title">
              {{ mode }}
              </h3>
              <input
                class="col-xs-9"
                type="email"
                name="email"
                required
                [(ngModel)]="user.email"
                #email="ngModel"
                placeholder="email"
              >
              <div class="email-error"
                [hidden]="email.valid || email.pristine"
              ></div>
              <input
                class="col-xs-9"
                type="password"
                name="password"
                required
                #password
                [(ngModel)]="user.password"
                placeholder="password"
              >
              <div class="password-error"
                [hidden]="email.valid || email.pristine"
              ></div>
              <div class="actions col-xs-12">
                <div class="row center-xs">
                  <button
                  [disabled]="!authForm.form.valid"
                  type="submit"
                  class="btn-light">
                  {{ mode }}
                  </button>
                  <a (click)="changeMode()" class="btn-light link">
                  {{ linkText }}
                  </a>
               </div>
             </div>
            </div>
          </form>
        </div>
  `
})

export class Auth {
  user = {
    email: '',
    password: ''
  };

  mode: string = 'signin';
  linkText: string = 'Don\'t have  an account?';

  constructor(private router: Router, private authService: AuthService) {}

  changeMode() {
    if (this.mode === 'signin') {
      this.mode = 'signup'
      this.linkText = 'Already have an account?';
    } else {
      this.mode = 'signin';
      this.linkText = 'Don\'t have an account?';
    }
  }

  authenticate() {
    this.authService.authenticate(this.mode, this.user)
    .subscribe(() => this.router.navigate(['']));
  }
 }
