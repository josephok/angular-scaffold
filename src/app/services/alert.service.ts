import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Alert, AlertType } from '../models/alert';

@Injectable()
export class AlertService {
  private subject = new Subject<Alert>();
  constructor() { }

  getAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }

  success(message: string) {
    this.alert(AlertType.Success, message);
  }

  error(message: string) {
    this.alert(AlertType.Error, message);
  }

  info(message: string) {
    this.alert(AlertType.Info, message);
  }

  warn(message: string) {
    this.alert(AlertType.Warning, message);
  }

  alert(type: AlertType, message: string) {
    this.subject.next(<Alert>{ type: type, message: message });
  }

  clear() {
    // clear alerts
    this.subject.next();
  }

}
