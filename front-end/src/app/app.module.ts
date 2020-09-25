import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';
import { CustomersComponent } from './customers/customers.component';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { DriversComponent } from './drivers/drivers.component';
import { TaxiComponent } from './taxi/taxi.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { DriverDashboardComponent } from './driver-dashboard/driver-dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DriverLocationComponent } from './driver-location/driver-location.component';
import { AgmCoreModule } from '@agm/core';
import { CustomerRideComponent } from './customer-ride/customer-ride.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TaxiDriverComponent } from './taxi-driver/taxi-driver.component';
import { SalaryComponent } from './salary/salary.component';
import { AgmDirectionModule } from 'agm-direction';
import { DriverDashboardLocationComponent } from './driver-dashboard-location/driver-dashboard-location.component';
import { DriverDashboardRidesComponent } from './driver-dashboard-rides/driver-dashboard-rides.component';
import { DriverDashboardSalaryComponent } from './driver-dashboard-salary/driver-dashboard-salary.component';
import { DriverDashboardAttendanceComponent } from './driver-dashboard-attendance/driver-dashboard-attendance.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminDashboardComponent,
    UsersComponent,
    CustomersComponent,
    DriversComponent,
    TaxiComponent,
    UserDashboardComponent,
    DriverDashboardComponent,
    HomePageComponent,
    DriverLocationComponent,
    CustomerRideComponent,
    AttendanceComponent,
  ForgotPasswordComponent,
  TaxiDriverComponent,
  SalaryComponent,
  DriverDashboardLocationComponent,
  DriverDashboardRidesComponent,
  DriverDashboardSalaryComponent,
  DriverDashboardAttendanceComponent,
  ],  
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDFLisLUnEOjI9aq3GDXDera2OraxbezbE'
    }),
    AgmDirectionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
