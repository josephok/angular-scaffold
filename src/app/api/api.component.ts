/// <reference path="../declare.ts" />

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertService } from '../services/alert.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  user = {};
  constructor(private api: ApiService, private alertService: AlertService) { }

  ngOnInit(): void {
    // 测试api
    this.api.test().subscribe(data => { }, err => { });
  }

}
