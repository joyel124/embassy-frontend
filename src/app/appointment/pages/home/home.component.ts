import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  date: Date | undefined;

  constructor(private router: Router) { }

  newAppointment() {
    this.router.navigate(['/new-appointment']);
  }
}
