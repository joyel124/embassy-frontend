import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.css']
})

export class AppointmentCardComponent {

  @Input() appointmentData: any;

  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  constructor(private router: Router, private messageService: MessageService) {
  }

  editAppointment() {
    this.edit.emit(this.appointmentData.id);
    this.router.navigate(['/edit-appointment']);
  }
  deleteAppointment() {
    this.delete.emit(this.appointmentData.id);
    this.messageService.add({severity:'success', summary:'Success', detail:'Cita eliminada'});
  }
}
