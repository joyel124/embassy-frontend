import { Component } from '@angular/core';
import {LookingAppointmentService} from "../../services/looking-appointment.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";

interface Time {
  id: number;
  timeString: string;
  isAvailable: boolean;
}

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent {
  date: Date | undefined;
  availableTimes: Time[] =[];
  selectedTime: number | null = null;
  isAppointmentScheduled: boolean = false;
  formData: any;

  constructor(private route: ActivatedRoute, private lookingAppointmentService: LookingAppointmentService, private messageService: MessageService, private router: Router) { }

  onDateChange(){
    this.isAppointmentScheduled = false;
    this.selectedTime = null;
    this.getAvailableTimes();
  }

  selectTime(id: number): void {
    this.selectedTime = id;
    console.log(this.selectedTime);
    this.isAppointmentScheduled = true; // Habilita el botón de agendar
  }

  getAvailableTimes() {
    if (this.date) {
      console.log(this.date);
      console.log(this.formatDate(this.date));
      const fecha = this.formatDate(this.date);
      this.lookingAppointmentService.getAvailableTimes(fecha).subscribe((data: any) => {
        this.formData = data;
        console.log(data);
        if(data.length > 0){
          this.availableTimes = data.map((item: { appointment_date: string | number | Date; is_available: boolean; appointment_id: number}) => {
            const date = new Date(item.appointment_date);

            if (!isNaN(date.getTime())) {
              const hours = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');
              return {
                id: item.appointment_id,
                timeString: `${hours}:${minutes}`,
                isAvailable: item.is_available
              };
            } else {
              console.error('Fecha inválida:', item.appointment_date);
              return 'Fecha inválida';
            }
          });

          console.log(this.availableTimes);
        }else{
          this.availableTimes = [];
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'No hay citas disponibles'});
        }
      });
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Enero es 0
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  async scheduleAppointment() {
    if(this.isAppointmentScheduled){
      const appointmentId = this.selectedTime;
      const email = localStorage.getItem('email');
      console.log(email);
      console.log(appointmentId);

      this.route.params.subscribe(params => {
        const id = +params['id'];
        console.log('ID del appointment:', id);
        this.deleteAppointment(id);
      });

      this.lookingAppointmentService.updateAppointmentStatus(email!, appointmentId!).subscribe((data: any) => {
        console.log(data);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Cita reprogramada'});
        this.router.navigate(['/home']);
      });
    }else{
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Seleccione un horario'});
    }
  }
  deleteAppointment(appointmentId: number) {
    // Lógica para borrar una cita
    this.lookingAppointmentService.deleteUserIdAppointment(appointmentId).subscribe((data: any) => {
      console.log(data);
    });
  }
}
