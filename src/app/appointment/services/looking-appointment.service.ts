import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from 'src/app/auth/model/user';

@Injectable({
  providedIn: 'root'
})
export class LookingAppointmentService {
  //private apiUrl = 'http://192.168.1.6:8000'; // Reemplaza esta URL con la URL de tu backend
  private apiUrl = 'http://192.168.18.12:8000';
  constructor(private http: HttpClient) { }

  getUser() : Observable<User> {
    let email = localStorage.getItem('email')!;
    return this.http.get<User>(`${this.apiUrl}/userbyemail?Email=${email}`);
  }
  updateStatus(Email:string, Looking_Appointment: string) {
    const data = new FormData();
    data.append('Email', Email);
    data.append('Looking_Appointment', Looking_Appointment);
    this.http.put(`${this.apiUrl}/updatestatus`, data).pipe(
      tap((response) => {
        console.log(response);
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    ).toPromise();
  }
  /*
  async updateStatus(Email: string, Looking_Appointment: string) : Promise<void | undefined> {
    const data = new FormData();
    data.append('Email', Email);
    data.append('Looking_Appointment', Looking_Appointment);
    console.log(data);
    try {
      await this.http.put(`${this.apiUrl}/updatestatus`, data)
      .pipe(
        tap((response) => {
          // Aquí puedes realizar acciones si la solicitud es exitosa, por ejemplo, guardar el token en el almacenamiento local.
          console.log(response);
        }),
        catchError((error) => {
          // Aquí puedes manejar errores en caso de que la solicitud falle.
          console.error(error);
          throw error; // Propaga el error para que el componente que realiza la llamada pueda manejarlo.
        })
      ).toPromise();
  } catch (error) {
    // Manejar los errores de inicio de sesión
    console.error(error);
    throw error; // Propaga el error para que el componente que realiza la llamada pueda manejarlo.
  }
  }
  */
}
