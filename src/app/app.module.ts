import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ApiComponent } from './api/api.component';
import { AlertComponent } from './alert/alert.component';

import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { AlertService } from './services/alert.service';
import { SongListComponent } from './song-list/song-list.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ApiComponent,
    AlertComponent,
    SongListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
