import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";


interface AuthResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://20.42.82.191:8000'; // url produccion
  //private apiUrl = 'http://192.168.1.6:8000'; // Reemplaza esta URL con la URL de tu backend
  //private apiUrl = 'http://192.168.18.12:8000';
  private isOpenLogin = false;
  private modalLoginStateSubject = new BehaviorSubject<boolean>(this.isOpenLogin);
  private loginSubject = new Subject<void>();
  private isRegisterOpen = false;
  private modalRegisterStateSubject = new BehaviorSubject<boolean>(this.isRegisterOpen);
  private registerSubject = new Subject<void>();

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {
  }

  openLogin() {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/home']);
    } else {
      this.isOpenLogin = true;
      this.modalLoginStateSubject.next(this.isOpenLogin);
    }
  }

  closeLogin() {
    this.isOpenLogin = false;
    this.modalLoginStateSubject.next(this.isOpenLogin);
  }

  getLoginStateObservable(): Observable<boolean> {
    return this.modalLoginStateSubject.asObservable();
  }

  onLogin() {
    this.loginSubject.next();
  }

  getLoginObservable(): Observable<void> {
    return this.loginSubject.asObservable();
  }

  openRegister() {
    this.isRegisterOpen = true;
    this.modalRegisterStateSubject.next(this.isRegisterOpen);
  }

  closeRegister() {
    this.isRegisterOpen = false;
    this.modalRegisterStateSubject.next(this.isRegisterOpen);
  }

  getRegisterStateObservable(): Observable<boolean> {
    return this.modalRegisterStateSubject.asObservable();
  }

  onRegister() {
    this.registerSubject.next();
  }

  getRegisterObservable(): Observable<void> {
    return this.registerSubject.asObservable();
  }

  async login(Email: string, Password: string): Promise<AuthResponse | undefined> {
    //const data = { Email, Password };
    const formData = new FormData();
    formData.append('Email', Email);
    formData.append('Password', Password);
    try {
      return await this.http.post<AuthResponse>(`${this.apiUrl}/login`, formData)
        .pipe(
          tap((response) => {
            // Aquí puedes realizar acciones si la solicitud es exitosa, por ejemplo, guardar el token en el almacenamiento local.
            if (response.access_token) {
              localStorage.setItem('token', response.access_token);
            }
          }),
          catchError((error) => {
            // Aquí puedes manejar errores en caso de que la solicitud falle.
            console.error(error);
            throw error; // Propaga el error para que el componente que realiza la llamada pueda manejarlo.
          })
        ).toPromise();
    } catch (error) {
      // Manejar los errores de inicio de sesión
      console.error(error);
      throw error; // Propaga el error para que el componente que realiza la llamada pueda manejarlo.
    }
  }

  async register(Email: string, First_Name: string, Last_Name: string, Password: string): Promise<void> {
    //const data = { username, name, lastname, password };
    const Looking_Appointment = "1";
    const formData = new FormData();
    formData.append('Email', Email);
    formData.append('First_Name', First_Name);
    formData.append('Last_Name', Last_Name);
    formData.append('Password', Password);
    formData.append('Looking_Appointment', Looking_Appointment);


    try {
      await this.http.post<any>(`${this.apiUrl}/register`, formData)
        .pipe(
          catchError((error) => {
            // Aquí puedes manejar errores en caso de que la solicitud falle.
            console.error(error);
            throw error; // Propaga el error para que el componente que realiza la llamada pueda manejarlo.
          })
        ).toPromise();

      // Puedes realizar acciones adicionales después del registro, si es necesario.
      console.log('Registro exitoso.');

    } catch (error) {
      const languageCode = localStorage.getItem('languageCode');
      //this.toastr.error('El correo ya existe', 'Error');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'El correo ya existe'});
      // Manejar los errores de registro
      console.error(error);
      throw error; // Propaga el error para que el componente que realiza la llamada pueda manejarlo.
    }
  }
}
