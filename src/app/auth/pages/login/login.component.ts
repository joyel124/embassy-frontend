import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";

interface AuthResponse {
  auth: boolean;
  token: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit, OnDestroy{
  public i18nService: any;
  isOpenLogin: boolean = false;
  username = '';
  password = '';
  user: any;
  loggedIn: any;
  authStateSubscription: Subscription | undefined;
  loginStateSubscription: Subscription | undefined;
  constructor(
              private authService: AuthService,
              private router: Router,
              private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loginStateSubscription=this.authService.getLoginStateObservable().subscribe((isOpenLogin: boolean) => {
      this.isOpenLogin = isOpenLogin;
    });
  }
  ngOnDestroy() {
    this.authStateSubscription?.unsubscribe();
    this.loginStateSubscription?.unsubscribe();
  }
  closeLogin() {
    this.authService.closeLogin();
  }
  openRegister() {
    this.closeLogin();
    this.authService.openRegister();
  }
  async login() {
    const languageCode = localStorage.getItem('languageCode');
    this.messageService.add({severity: 'success', summary: 'Success', detail: '¡Inicio de sesión exitoso!'});
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }
}
