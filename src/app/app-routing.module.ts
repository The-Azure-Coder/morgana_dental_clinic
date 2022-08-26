import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDetailsComponent } from './components/pages/doctor-details/doctor-details.component';
import { AppointmentFormComponent } from './components/pages/appointment-form/appointment-form.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ServiceDetailComponent } from './components/pages/service-detail/service-detail.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { AppointmentsComponent } from './components/pages/appointments/appointments.component';
import { BookAppointmentComponent } from './components/pages/book-appointment/book-appointment.component';
import { EditAppointmentComponent } from './components/pages/edit-appointment/edit-appointment.component';
import { PatientDetailsComponent } from './components/pages/patient-details/patient-details.component';
import { DentistlistComponent } from './components/pages/dentistlist/dentistlist.component';
import { AddDentistComponent } from './components/pages/add-dentist/add-dentist.component';
import { EditDentistComponent } from './components/pages/edit-dentist/edit-dentist.component';
import { ViewAppointDetailsComponent } from './components/pages/view-appoint-details/view-appoint-details.component';
import { ServicelistComponent } from './components/pages/servicelist/servicelist.component';
import { AddServiceComponent } from './components/pages/add-service/add-service.component';
import { EditServiceComponent } from './components/pages/edit-service/edit-service.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'appoint', component: AppointmentFormComponent },
  { path: 'services/:id', component: ServiceDetailComponent },
  { path: 'dentists/:id', component: DoctorDetailsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'bookappoints', component: BookAppointmentComponent },
  { path: 'bookappointments/:id', component: BookAppointmentComponent },
  { path: 'appointEdit/:id', component: EditAppointmentComponent },
  { path: 'patientDetails/:id', component: PatientDetailsComponent },
  { path: 'dentistList', component: DentistlistComponent },
  { path: 'addDentist', component: AddDentistComponent },
  { path: 'editDentist/:id', component: EditDentistComponent },
  { path: 'viewMore/:id', component: ViewAppointDetailsComponent },
  { path: 'serviceList', component: ServicelistComponent },
  { path: 'addService', component: AddServiceComponent },
  { path: 'editService/:id', component: EditServiceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
