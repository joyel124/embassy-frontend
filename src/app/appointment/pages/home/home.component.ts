import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LookingAppointmentService} from "../../services/looking-appointment.service";

interface Appointment {
  id: number;
  date: string;
  time: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  date: Date | undefined;

  formData: Appointment[] = [];

  constructor(private router: Router, private lookingAppointmentService: LookingAppointmentService) { }

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments() {
    // Lógica para obtener las citas del usuario
    const email = localStorage.getItem('email');
    this.lookingAppointmentService.getAppointmentsByUser(email!).subscribe((data: any) => {
      console.log(data);
      this.formData = data;
      this.formData = data.map((item: { appointment_date: string | number | Date; is_available: boolean; appointment_id: number}) => {
        const date = new Date(item.appointment_date);

        if (!isNaN(date.getTime())) {
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          return {
            id: item.appointment_id,
            date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            time: `${hours}:${minutes}`
          };
        }
        return null;
      });
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Enero es 0
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  newAppointment() {
    this.router.navigate(['/new-appointment']);
  }

  editAppointment(appointmentId: number) {
    // Lógica para editar una cita
  }

  deleteAppointment(appointmentId: number) {
    // Lógica para borrar una cita
    this.lookingAppointmentService.deleteUserIdAppointment(appointmentId).subscribe((data: any) => {
      console.log(data);
      this.getAppointments();
    });
  }
}
