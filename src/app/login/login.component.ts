import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../providers/auth.service';
import {Store} from '@ngrx/store';
import {AuthState} from './auth/auth.reducer';
import {Login} from './auth/auth.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private store: Store<AuthState>,
              private router: Router,
              private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {}

  login() {
    const user = this.loginForm.value;

    if (this.authService.loginUser(user)) {
      this.store.dispatch(new Login(user));
    } else {
      console.log('Falsche Login Daten!');
    }
  }

}
