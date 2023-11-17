import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isOpenLogin = false;
  private modalLoginStateSubject = new BehaviorSubject<boolean>(this.isOpenLogin);
  private loginSubject = new Subject<void>();
  private isRegisterOpen = false;
  private modalRegisterStateSubject = new BehaviorSubject<boolean>(this.isRegisterOpen);
  private registerSubject = new Subject<void>();

  constructor(private router: Router) {
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
}
