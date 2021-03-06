import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService } from '../login-service.service';
import { Login } from '../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  errorMessage: string;
  constructor(private router: Router, private LoginService: LoginServiceService, private formbulider: FormBuilder) { }

  ngOnInit() {
    sessionStorage.removeItem('UserName');
    sessionStorage.clear();

    this.loginForm = this.formbulider.group({
      UserName: ['', [Validators.required]],
      UserPassword: ['', [Validators.required]]

    });
  }

  onFormSubmit() {
    const login = this.loginForm.value;
    if (this.loginForm.invalid) {
      alert("Please fill all the credentials");
      return;
    }
    this.login(login);
  }

  forgotPassword() {
    this.router.navigate(['forgotPassword']);
  }

  login(login: Login) {
    this.LoginService.Login(login).subscribe(
      data => {

        if (data != null) {

          localStorage.setItem("User", data.toString());

          if (data.UserType == 1) {

            this.router.navigate(['admin']);
            localStorage.setItem("UserType", "admin");
            localStorage.setItem("UserId", data.UserId.toString());
            localStorage.setItem("UserName", data.Username.toString());

          }
          else if (data["Users"]["UserType"] == 2) {
            localStorage.setItem("UserType", "driver");
            localStorage.setItem("DriverId", data["DriverId"]);
            localStorage.setItem("DriverName", data["DriverName"]);
            this.router.navigate(['driverDashboard']);
          }
          else if (data["Users"]["UserType"] == 3) {
            localStorage.setItem("UserType", "customer");
            localStorage.setItem("CustomerId", data["CustomerId"]);
            localStorage.setItem("CustomerName", data["CustomerName"]);
            this.router.navigate(['userDashboard']);
          }
        }
        else {
          alert("Invalid Username or Password");
          
        }
      },
      error => {
        this.errorMessage = error.message;
      });
  };

  onSignUp() {
    this.router.navigate(['signup']);
  }

}
