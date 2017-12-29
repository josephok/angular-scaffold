import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { ApiComponent } from './components/api/api.component';
import { AlertComponent } from './components/alert/alert.component';

import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { AlertService } from './services/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ApiComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ApiService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
