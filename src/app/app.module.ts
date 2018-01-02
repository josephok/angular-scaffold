import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ApiComponent } from './api/api.component';
import { AlertComponent } from './alert/alert.component';

import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { SongListComponent } from './song-list/song-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthGuard } from './auth-guard.guard';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ApiComponent,
    AlertComponent,
    SongListComponent,
    LoginComponent,
    RegisterComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService, AlertService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
