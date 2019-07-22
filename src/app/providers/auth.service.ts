import { Injectable } from '@angular/core';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginUser(user: User): boolean {
    if (user) {
      return (user.id === '25' && user.email === 'biggest@test.com') ? true : false;
    }
  }
}
