import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/partials/nav-bar/nav-bar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { CardSliderComponent } from './components/partials/card-slider/card-slider.component';
import { LoginComponent } from './components/pages/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    CardSliderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
