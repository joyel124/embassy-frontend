import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { MessageService } from 'primeng/api';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit, OnDestroy{
  public i18nService: any;
  isOpenRegister: boolean = false;
  email = '';
  name = '';
  lastname = '';
  password = '';
  password2: string = '';
  passwordsMatch: boolean = false;
  user: any;
  loggedIn: any;
  authStateSubscription: Subscription | undefined;
  loginStateSubscription: Subscription | undefined;
  constructor(private router: Router, private authService: AuthService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loginStateSubscription=this.authService.getRegisterStateObservable().subscribe((isOpenRegister: boolean) => {
      this.isOpenRegister = isOpenRegister;
    });
  }
  ngOnDestroy() {
    this.authStateSubscription?.unsubscribe();
    this.loginStateSubscription?.unsubscribe();
  }
  closeRegister() {
    this.authService.closeRegister();
  }
  openLogin() {
    this.closeRegister();
    this.authService.openLogin();
  }
  async onSignup() {
    try {
      await this.authService.register(this.email, this.name, this.lastname, this.password);
      // Registro exitoso, redirige al usuario a otra página o muestra un mensaje de éxito.
      console.log('Registro exitoso');
      this.messageService.add({ severity: 'success', summary: 'Success', detail: '¡Registro exitoso!' });
      this.authService.closeRegister();
      this.authService.openLogin();
    } catch (error) {
      // Manejar los errores de registro y mostrar mensajes de error en el componente.
      console.error('Error en el registro:', error);
    }
  }
  checkPasswordsMatch(): void {
    const regexContrasenaSegura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const regexFormatoCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (this.password === this.password2 && this.password !== '' && this.password2 !== '') {
      if (regexContrasenaSegura.test(this.password) && regexFormatoCorreo.test(this.email)) {
        // La contraseña es segura y el correo tiene un formato válido
        this.passwordsMatch = true;
        this.onSignup();
        // Realizar aquí la llamada al servicio para registrar al usuario
        // this.authService.register(this.username, this.password, this.email).subscribe(...)
      } else {
        // Verificación fallida: contraseña no segura o correo con formato incorrecto
        this.passwordsMatch = false;

        if (!regexContrasenaSegura.test(this.password)) {
          const languageCode = localStorage.getItem('languageCode');
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La contraseña no es segura. Debe tener al menos 8 caracteres y contener una combinación de letras mayúsculas, letras minúsculas, números y caracteres especiales (@$!%*?&)' });
        }

        if (!regexFormatoCorreo.test(this.email)) {
          const languageCode = localStorage.getItem('languageCode');
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El correo electrónico no tiene un formato válido' });
        }
      }
    } else {
      // Las contraseñas no coinciden
      this.passwordsMatch = false;
      const languageCode = localStorage.getItem('languageCode');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Las contraseñas no coinciden' });
    }
  }
}
