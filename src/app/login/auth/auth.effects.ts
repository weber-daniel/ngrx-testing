import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {AuthActionTypes, AuthActions, Login, Logout} from './auth.actions';
import {tap} from 'rxjs/internal/operators/tap';
import {defer, noop} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {Router} from '@angular/router';


@Injectable()
export class AuthEffects {

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      console.log('Erfolgreich eingeloggt!');
      console.log(action.payload);
      this.router.navigateByUrl('/dashboard').then(() => noop());
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(() => {
      localStorage.removeItem('user');
      console.log('Erfolgreich ausgeloggt!');
      this.router.navigateByUrl('/login').then(() => noop());
    })
  );

  @Effect()
  init$ = defer(() => {

    const userData = localStorage.getItem('user');

    if (userData) {
      return of(new Login(JSON.parse(userData)));
    } else {
      return of(new Logout()) as any;
    }

  });

  constructor(private actions$: Actions, private router: Router) {}

}
