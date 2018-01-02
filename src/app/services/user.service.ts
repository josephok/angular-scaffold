import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable()
export class UserService {
  private token: string;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    const url = `${environment.USER_URL}/api/login`;
    const data = { username: username, password: password };
    return this.http.post<User>(url, data);
  }

  register(username: string, password: string): Observable<User> {
    const url = `${environment.USER_URL}/api/signup`;
    const data = { username: username, password: password };
    return this.http.post<User>(url, data);
  }

  logout() {
    const token = JSON.parse(localStorage.getItem('currentUser')).token;
    localStorage.removeItem('currentUser');
    const url = `${environment.USER_URL}/api/logout`;
    const data = { token: token };
    return this.http.post(url, data);
  }

  get authticated(): boolean {
    return Boolean(localStorage.getItem('currentUser'));
  }
}
