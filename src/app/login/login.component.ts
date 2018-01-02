/// <reference path="../declare.ts" />

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    username: '',
    password: ''
  };

  loading = false;

  constructor(private userService: UserService, private router: Router) {
    if (userService.authticated) {
      router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  login() {
    this.loading = true;

    this.userService.login(this.user.username, this.user.password).subscribe(
      data => {
        this.loading = false;
        // Read the result field from the JSON response.
        const { id, token } = data;
        if (token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ id: id, token: token }));
          // return true to indicate successful login
          this.router.navigate(['/']);
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      },
      (err) => {
        this.loading = false;
        console.error(err);
        Materialize.toast('登入失败！' + err.error.message, environment.TOAST_DELAY);
        return false;
      }
    );
  }

}
