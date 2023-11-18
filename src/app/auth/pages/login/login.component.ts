import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";

interface AuthResponse {
  access_token: string;
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
  email = '';
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
    try {
      const response = await this.authService.login(this.email, this.password) as AuthResponse;
      // Manejar la respuesta del backend aquí
      if (response.access_token) {
        //console.log(response);
        // Almacenar el token en el almacenamiento local o en las cookies
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('email', this.email);
        this.messageService.add({severity: 'success', summary: 'Success', detail: '¡Inicio de sesión exitoso!'});
        setTimeout(async () => {
          await this.router.navigate(['/home']);
        }, 1000);
      }
    } catch (error) {
      // Manejar los errores de inicio de sesión
      console.error('Error en el inicio de sesión:', error);
      this.messageService.add({severity: 'error', summary: 'Error', detail: '¡Error en el inicio de sesión!'});
      //this.toastr.error('¡Contraseña o Correo Incorrecto!', '¡Error!');
    }
  }
}
