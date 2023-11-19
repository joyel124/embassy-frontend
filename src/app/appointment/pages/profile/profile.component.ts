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
        this.user = data;
        console.log(data);
      },
      error: (e) => console.log(e),
    });
  }
  cancelSubscription(): void {
    let email = localStorage.getItem('email')!;
    console.log('Trying with ' + email);
    this.lookingAppointmentService.updateStatus(email, '0');
    this.retrieveUser();
  }
  startSubscription(): void {
    let email = localStorage.getItem('email')!;
    console.log('Trying with ' + email);
    this.lookingAppointmentService.updateStatus(email, '1');
    this.retrieveUser();
  }
  save() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: '¡Perfil actualizado!'});
  }
}
