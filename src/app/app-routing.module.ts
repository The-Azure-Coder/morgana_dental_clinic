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

import { UserlistComponent } from './components/pages/userlist/userlist.component';
import { AddUserComponent } from './components/pages/add-user/add-user.component';
import { EditUserComponent } from './components/pages/edit-user/edit-user.component';
import { AdminGuard } from './admin.guard';
import { PatientSearchComponent } from './components/pages/patient-search/patient-search.component';
import { UserGuard } from './user.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'appoint', component: AppointmentFormComponent, canActivate: [UserGuard] },
  { path: 'services/:id', component: ServiceDetailComponent },
  { path: 'dentists/:id', component: DoctorDetailsComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
  { path: 'appointments', component: AppointmentsComponent, canActivate: [AdminGuard] },
  { path: 'bookappoints', component: BookAppointmentComponent, canActivate: [AdminGuard] },
  { path: 'bookappointments/:id', component: BookAppointmentComponent },
  { path: 'appointEdit/:id', component: EditAppointmentComponent },
  { path: 'patientDetails/:id', component: PatientDetailsComponent },
  { path: 'dentistList', component: DentistlistComponent, canActivate: [AdminGuard] },
  { path: 'addDentist', component: AddDentistComponent },
  { path: 'editDentist/:id', component: EditDentistComponent },
  { path: 'viewMore/:id', component: ViewAppointDetailsComponent },
  { path: 'serviceList', component: ServicelistComponent, canActivate: [AdminGuard] },
  { path: 'addService', component: AddServiceComponent },
  { path: 'editService/:id', component: EditServiceComponent },
  { path: 'userList', component: UserlistComponent, canActivate: [AdminGuard] },
  { path: 'addUser', component: AddUserComponent },
  { path: 'search', component: PatientSearchComponent, canActivate: [UserGuard] },
  { path: 'editUser/:id', component: EditUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
