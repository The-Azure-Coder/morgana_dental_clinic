import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/partials/nav-bar/nav-bar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { CardSliderComponent } from './components/partials/card-slider/card-slider.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SignupComponent } from './components/pages/signup/signup.component';
import { AppointmentFormComponent } from './components/pages/appointment-form/appointment-form.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ServiceDetailComponent } from './components/pages/service-detail/service-detail.component';
import { DoctorDetailsComponent } from './components/pages/doctor-details/doctor-details.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { DashNavComponent } from './components/partials/dash-nav/dash-nav.component';
import { MatTableModule } from '@angular/material/table';
import { Chart1Component } from './components/partials/chart1/chart1.component';
import { AppointmentsComponent } from './components/pages/appointments/appointments.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BookAppointmentComponent } from './components/pages/book-appointment/book-appointment.component';
import { EditAppointmentComponent } from './components/pages/edit-appointment/edit-appointment.component';
import { PatientDetailsComponent } from './components/pages/patient-details/patient-details.component';
import { DentistlistComponent } from './components/pages/dentistlist/dentistlist.component';
import { AddDentistComponent } from './components/pages/add-dentist/add-dentist.component';
import { EditDentistComponent } from './components/pages/edit-dentist/edit-dentist.component';
import { Chart2Component } from './components/partials/chart2/chart2.component';
import { ViewAppointDetailsComponent } from './components/pages/view-appoint-details/view-appoint-details.component';
import { ServicelistComponent } from './components/pages/servicelist/servicelist.component';
import { AddServiceComponent } from './components/pages/add-service/add-service.component';
import { EditServiceComponent } from './components/pages/edit-service/edit-service.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    CardSliderComponent,
    LoginComponent,
    SignupComponent,
    AppointmentFormComponent,
    DoctorDetailsComponent,
    DashboardComponent,
    DashNavComponent,
    ServiceDetailComponent,
    Chart1Component,
    AppointmentsComponent,
    BookAppointmentComponent,
    EditAppointmentComponent,
    PatientDetailsComponent,
    DentistlistComponent,
    AddDentistComponent,
    EditDentistComponent,
    Chart2Component,
    ViewAppointDetailsComponent,
    ServicelistComponent,
    AddServiceComponent,
    EditServiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
