/// <reference path="../declare.ts" />

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;

  loading = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    if (userService.authticated) {
      router.navigate(['/']);
    } else {
      this.regForm = fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPass: ['', Validators.required]
      }, {
          validator: function (fg: FormGroup) {
            return fg.get('password').value === fg.get('confirmPass').value ? null : { 'mismatch': true };
          }
        });
    }
  }

  ngOnInit() {
  }

  get username() {
    return this.regForm.get('username');
  }

  get password() {
    return this.regForm.get('password');
  }

  get confirmPass() {
    return this.regForm.get('confirmPass');
  }

  registry() {
    this.loading = true;
    this.userService.register(this.username.value, this.password.value).subscribe(
      data => { // Read the result field from the JSON response.
        this.loading = false;
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
      err => {
        this.loading = false;
        console.error(err);
        Materialize.toast('注册失败！' + err.error.message, environment.TOAST_DELAY);
        return false;
      }
    );


  }

}
