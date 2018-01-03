import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { UserService } from './services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    const auth = this.injector.get(UserService);
    const router = this.injector.get(Router);
    const authHeader = auth.getAuthorizationHeader();
    let authReq = req;
    if (authHeader) {
      // Clone the request to add the new header.
      authReq = req.clone({ headers: req.headers.set('Authorization', authHeader) });
      // Pass on the cloned request instead of the original request.
    }

    return next.handle(authReq).do(event => {

    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          auth.logout().subscribe(data => { }, err => { console.error(err); });
          router.navigate(['/login']);
        }
      }
    });
  }
}
