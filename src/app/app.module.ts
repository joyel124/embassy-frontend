import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {ButtonModule} from "primeng/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LandingpageComponent } from './common/pages/landingpage/landingpage.component';
import { PageNotFoundComponent } from './common/pages/page-not-found/page-not-found.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import { LanguageButtonComponent } from './common/components/language-button/language-button.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import {FormsModule} from "@angular/forms";
import { ToastModule } from 'primeng/toast';
import {MessageService} from "primeng/api";
import { HomeComponent } from './appointment/pages/home/home.component';
import { ResetPasswordComponent } from './auth/pages/reset-password/reset-password.component';
import {CalendarModule} from "primeng/calendar";
import { NavbarComponent } from './common/components/navbar/navbar.component';
import { AppointmentCardComponent } from './common/components/appointment-card/appointment-card.component';
import { ProfileComponent } from './appointment/pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    PageNotFoundComponent,
    LanguageButtonComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ResetPasswordComponent,
    NavbarComponent,
    AppointmentCardComponent,
    ProfileComponent
  ],
    imports: [
        BrowserModule,
        ButtonModule,
        ToastModule,
        BrowserAnimationsModule,
        RouterLink,
        RouterOutlet,
        AppRoutingModule,
        FormsModule,
        CalendarModule
    ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
