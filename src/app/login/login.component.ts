import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

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

  showLoginError = false;
  showLoginSuccess = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login() {

    this.userService.login(this.user.username, this.user.password).subscribe(
      data => {
        // Read the result field from the JSON response.
        const { id, token } = data;
        if (token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ id: id, token: token }));
          // return true to indicate successful login
          this.showLoginSuccess = true;
          this.router.navigate(['/']);
          return true;
        } else {
          // return false to indicate failed login
          this.showLoginError = true;
          return false;
        }
      },
      (err) => {
        console.error(err);
        this.showLoginError = true;
      }
    );
  }

}
