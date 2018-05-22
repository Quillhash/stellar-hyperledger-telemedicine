import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Routes,RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientComponent } from './patient/patient.component';
import {DocNavigationComponent} from './doctor/doc-navigation/doc-navigation.component'
import {DocVideoComponent} from './doctor/doc-video/doc-video.component'
import {PatientNavigationComponent}  from './patient/patient-navigation/patient-navigation.component'
import {PatientVideoComponent}  from './patient/checkups/patient-video/patient-video.component'
import { PaymentService } from './service/payment.service';
import { PaymentComponent } from './patient/payment/payment.component';
import { CheckupsComponent } from './patient/checkups/checkups.component';



const appRoutes : Routes =[
  {
    path:'',component:LoginComponent
  },
  {
    path:'doctor',component:DoctorComponent
  },
  {
    path:'patient',component:PatientComponent
  },
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DoctorComponent,
    PatientComponent,
    DocNavigationComponent,
    DocVideoComponent,
    PatientVideoComponent,
    PatientNavigationComponent,
    PaymentComponent,
    CheckupsComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
