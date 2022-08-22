import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';
import { AppointmentFormComponent } from './components/pages/appointment-form/appointment-form.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ServiceDetailComponent } from './components/pages/service-detail/service-detail.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';

const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'login',component: LoginComponent},
  {path: 'register',component:SignupComponent},
  {path: 'appoint',component:AppointmentFormComponent},
  {path: 'services/:id',component:ServiceDetailComponent },
  {path: 'dentists/:id',component: DoctorDetailsComponent },
  {path: 'dashboard',component:DashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
