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
  constructor(private router: Router, private LoginService: LoginServiceService,private formbulider: FormBuilder) { }

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
    this.login(login);
  }

  login(login: Login) {
    //  this.router.navigate(['admin']);
    //debugger;

    this.LoginService.Login(login).subscribe(
      data => {
        
        if (data != null) {
          if (data.UserType == 1) {
            this.router.navigate(['admin']);
          }
          else if (data.UserType == 2) {
            this.router.navigate(['driverDashboard']);
          }
          else if (data.UserType == 3) {
            this.router.navigate(['userDashboard']);
          }
        }
        else {
          alert("Invalid Username or Password");
          //  this.errorMessage = data.Message;
        }
      },
      error => {
        this.errorMessage = error.message;
      });
  };

}
