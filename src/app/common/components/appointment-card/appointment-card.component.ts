import { Component, Input } from '@angular/core';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.css']
})

export class AppointmentCardComponent {
  constructor(private router: Router, private messageService: MessageService) {
  }

  editAppointment() {
    this.router.navigate(['/edit-appointment']);
  }
  deleteAppointment() {
    this.messageService.add({severity:'success', summary:'Success', detail:'Cita eliminada'});
  }
}
