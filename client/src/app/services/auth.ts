import { ApiService } from './api';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StoreHelper } from './store-helper';
import { Store } from '../store';
import 'rxjs/Rx';

@Injectable()
export class AuthService implements CanActivate {
  JWT_KEY: string = 'codetodo_token';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private storeHelper: StoreHelper,
    private store: Store
  ) {

    if (window.localStorage.getItem(this.JWT_KEY)) {
      this.setJwt(window.localStorage.getItem(this.JWT_KEY));
      this.storeHelper.update('userId', this.userId);
    }

  }

  setJwt(jwt: string) {
    window.localStorage.setItem(this.JWT_KEY, jwt);
    this.apiService.setHeaders({Authorization: `${jwt}`})
  }

  userId () {
    return this.apiService.get('/auth/whoami');
  }

  authenticate(path, creds) {
    return this.apiService.post(`/auth/${path}`, creds)
    .do(res => res.userId = this.userId)
    .do(res => this.setJwt(res.token))
    .do(res => this.storeHelper.update('userId', res.userId))
    .map(res => res.data);
  }

  signout() {
    window.localStorage.removeItem(this.JWT_KEY);
    this.store.purge();
    this.router.navigate(['', 'auth']);
  }

  isAuthorized(): boolean {
    return Boolean(window.localStorage.getItem(this.JWT_KEY));
  }

  canActivate(): boolean {
    const isAuth = this.isAuthorized();

    if(!isAuth) {
      this.router.navigate(['', 'auth']);
    }

    return isAuth;
  }
}
