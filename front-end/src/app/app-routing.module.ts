import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';
import { CustomersComponent } from './customers/customers.component';
import { DriversComponent } from './drivers/drivers.component';
import { TaxiComponent } from './taxi/taxi.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { DriverDashboardComponent } from './driver-dashboard/driver-dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DriverLocationComponent } from './driver-location/driver-location.component';
import { CustomerRideComponent } from './customer-ride/customer-ride.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TaxiDriverComponent } from './taxi-driver/taxi-driver.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'admin',
    component: AdminDashboardComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'drivers',
    component: DriversComponent
  },
  {
    path: 'taxi',
    component: TaxiComponent
  },
  {
    path: 'userDashboard',
    component: UserDashboardComponent
  },
  {
    path: 'driverDashboard',
    component: DriverDashboardComponent
  },
  {
    path: 'driverLocation',
    component: DriverLocationComponent
  },
  {
    path: 'customerRide',
    component: CustomerRideComponent
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'taxiDriver',
    component: TaxiDriverComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
