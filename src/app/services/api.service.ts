import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../config';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  get(): Observable<User> {
    return this.http.get<User>(`${BASE_URL}/api`);
  }

}
