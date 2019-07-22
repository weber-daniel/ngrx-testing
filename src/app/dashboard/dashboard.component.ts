import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AuthState} from '../login/auth/auth.reducer';
import {isLoggedIn} from '../login/auth/auth.selectors';
import {Logout} from '../login/auth/auth.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<AuthState>) { }

  ngOnInit() {

    this.isLoggedIn$ = this.store
      .pipe(
        select(isLoggedIn)
      );

  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
