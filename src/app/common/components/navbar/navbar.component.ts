import { Component } from '@angular/core';
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuVisible: boolean = false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  constructor(private messageService: MessageService, private router: Router) {
  }
  logout() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: '¡Cierre de sesión exitoso!'});
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }
}
