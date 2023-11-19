import { TestBed } from '@angular/core/testing';

import { LookingAppointmentService } from './looking-appointment.service';

describe('LookingAppointmentService', () => {
  let service: LookingAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LookingAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
