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
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { SongListComponent } from './song-list/song-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ApiComponent,
    AlertComponent,
    SongListComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService, AlertService, UserService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
