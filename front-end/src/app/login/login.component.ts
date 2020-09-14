import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model : any={};
  errorMessage:string;
  constructor( private router:Router,private LoginService:LoginServiceService ) { }

  ngOnInit() {
    sessionStorage.removeItem('UserName');
    sessionStorage.clear();
  }
  login(){
    debugger;
    this.LoginService.Login(this.model).subscribe(
      data => {
        debugger;
        if(data.Status=="Success")
        {
          this.router.navigate(['userDashboard']);
          debugger;
        }
        else{
          this.errorMessage = data.Message;
        }
      },
      error => {
        this.errorMessage = error.message;
      });
  };

}
