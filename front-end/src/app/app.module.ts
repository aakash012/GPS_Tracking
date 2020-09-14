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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
