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
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #eeeeee;
          border-bottom: 1px solid lightgrey;
          height: 55px;
          font-size: 15px;
          background-color: white;
        }
        .ng-invalid.ng-dirty {
          border-bottom: 1px solid red;
        }
        form {
          width: 100%;
          border-radius: 2px;
          background-color: #F5F5F5;
          padding: 10px;
          height: 400px;
        }

        h3 {
          text-transform: capitalize;
        }
        .inputs {
          height: 100%;
          position: relative;
        }
        .link {
          color: #FFC107;
          padding: 5px;
          margin-left: 20px;
          border: 2px solid #FFC107;
          cursor: pointer;
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
              {{ titleText }}
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
                  class="col-xs-5 btn-light submit-button">
                  {{ mode }}
                  </button>
                  <a (click)="changeMode()" class="col-xs-5 link">
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
  titleText: string = 'Sign In';
  constructor(private router: Router, private authService: AuthService) {}

  changeMode() {
    if (this.mode === 'signin') {
      this.mode = 'signup'
      this.linkText = 'Already have an account?';
      this.titleText = 'Create a new Account';
    } else {
      this.mode = 'signin';
      this.linkText = 'Don\'t have an account?';
      this.titleText = 'Sign In'
    }
  }

  authenticate() {
    this.authService.authenticate(this.mode, this.user)
    .subscribe(() => this.router.navigate(['']));
  }
 }
