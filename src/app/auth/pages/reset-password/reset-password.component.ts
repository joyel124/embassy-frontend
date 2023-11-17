import {Component, OnInit} from '@angular/core';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  isSubmitted: boolean = false;
  username: string = '';

  constructor(private messageService: MessageService){}

  ngOnInit(): void {

  }
  onSubmit() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se ha enviado un correo para restablecer la contraseña' });
  }
}
