import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import { User } from "src/app/auth/model/user"
import { LookingAppointmentService } from './../../services/looking-appointment.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User;

  constructor(private messageService: MessageService, private lookingAppointmentService: LookingAppointmentService) {
  }

  ngOnInit(): void {
    this.retrieveUser();
  }

  retrieveUser(): void {
    this.lookingAppointmentService.getUser().subscribe({
      next: (data) => {
        console.log(data);
        this.user ={
          ID: data[0],
          Email: data[3],
          First_Name: data[1],
          Last_Name: data[2],
          Looking_Appointment: data[4],
        }
        console.log(this.user);
      },
      error: (e) => console.log(e),
    });
  }
  cancelSubscription(): void {
    let email = localStorage.getItem('email')!;
    console.log('Trying with ' + email);
    this.lookingAppointmentService.updateStatus(email, '0');
    this.messageService.add({severity: 'success', summary: 'Cancelo', detail: '¡Se cancelo la suscripcion!'});
    this.retrieveUser();
  }
  startSubscription(): void {
    let email = localStorage.getItem('email')!;
    console.log('Trying with ' + email);
    this.lookingAppointmentService.updateStatus(email, '1');
    this.messageService.add({severity: 'success', summary: 'Activo', detail: '¡Se activo la suscripcion!'});
    this.retrieveUser();
  }
  save() {
    this.messageService.add({severity: 'success', summary: 'Actualizado', detail: '¡Perfil actualizado!'});
  }
}
