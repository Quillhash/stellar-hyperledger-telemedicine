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
import {DocVideoComponent} from './doctor/appointments/doc-video/doc-video.component'
import {PatientNavigationComponent}  from './patient/patient-navigation/patient-navigation.component'
import {PatientVideoComponent}  from './patient/checkups/patient-video/patient-video.component'
import { PaymentService } from './service/payment.service';
import { PaymentComponent } from './patient/payment/payment.component';
import { CheckupsComponent } from './patient/checkups/checkups.component';
import { AppointmentsComponent } from './doctor/appointments/appointments.component';
import { PatientsComponent } from './doctor/patients/patients.component';
import { DocPaymentsComponent } from './doctor/doc-payments/doc-payments.component';

import { ProfileComponent } from './doctor/profile/profile.component';
import { AppointmentListComponent } from './doctor/appointments/appointment-list/appointment-list.component';
import { CryptoService } from './service/crypto.service';
import { PatientProfileComponent } from './patient/patient-profile/patient-profile.component';
import { DoctorsComponent } from './patient/doctors/doctors.component';




const appRoutes : Routes =[
  {
    path:'',component:LoginComponent
  },
  {
    path:'doctor',component:DoctorComponent,children:[
      {
        path:'appointments',component:AppointmentsComponent,children:[
          
          {
            path:'patients/checkups',component:AppointmentListComponent
          },
          {
            path:'patients/checkups/video/:id',component:DocVideoComponent
          }
        ]
      },
      {
        path:'patients',component:PatientsComponent
      },
      
      {
        path:'payments',component:DocPaymentsComponent
      },
      {
        path:'',redirectTo:'/doctor/profile', pathMatch:'full'
      },
      {
        path:'profile',component:ProfileComponent
      }

      
    ]
  },
  {
    path:'patient',component:PatientComponent,children:[
      {
        path:'profile',component:PatientProfileComponent
      },
      {
        path:'doctors',component:DoctorsComponent
      },
      
      {
        path:'checkups',component:CheckupsComponent
      },
      
      {
        path:'payment',component:PaymentComponent
      }

      
    ]
  }
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
    AppointmentsComponent,
    PatientsComponent,
    ProfileComponent,
    DocPaymentsComponent,
    AppointmentListComponent,
    PatientProfileComponent,
    DoctorsComponent

  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PaymentService,CryptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
