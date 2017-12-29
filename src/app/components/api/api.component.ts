/// <reference path="../../declare.ts" />

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AlertService } from '../../services/alert.service';
import { TOAST_DELAY } from '../../config';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  user = {};
  constructor(private api: ApiService, private alertService: AlertService) { }

  ngOnInit(): void {
    // Make the HTTP request:
    this.api.get().subscribe(data => {
      // Read the result field from the JSON response.
      this.user = data;
    },
      (err) => {
        console.error(err);
        Materialize.toast('I am a toast!', TOAST_DELAY);
        // this.alertService.error('Get data error!');
      });
  }

}
