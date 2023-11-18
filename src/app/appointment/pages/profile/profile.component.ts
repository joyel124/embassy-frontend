import { Component } from '@angular/core';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  name: string = "John Doe";
  email: string = "";

  constructor(private messageService: MessageService) {
  }

  save() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: '¡Perfil actualizado!'});
  }
}
