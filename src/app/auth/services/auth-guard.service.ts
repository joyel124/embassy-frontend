import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from "rxjs";
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private messageService: MessageService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token')) {
      // Si el usuario está autenticado, devuelve true
      return true;
    } else {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debes iniciar sesión para acceder a esta página'});
      this.router.navigate(['/landing']);
      return false;
      //this.toastr.error('Debes iniciar sesión para acceder a esta página', 'Error');
    }
  }
}
