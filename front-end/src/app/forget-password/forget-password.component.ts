import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class forgotPasswordComponent implements OnInit {

  usernamCheckForm:any;
  OTPForm:any;
  updatePasswordForm:any;
  OTPshow=false;
  usernamCheckshow=true;
  updatePasswordshow=false;
  constructor(private router: Router,private formbulider: FormBuilder) { }

  ngOnInit(): void {

    this.usernamCheckForm = this.formbulider.group({
      UserName: ['', [Validators.required, Validators.minLength(6)]],
      
      CustomerPassword: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
    });
    this.OTPForm = this.formbulider.group({
      OTP: ['', [Validators.required, Validators.minLength(6)]],
      
    });
    this.updatePasswordForm = this.formbulider.group({
     UserPassword: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
    });
  }

  onUserNameFormSubmit(){
    this.OTPshow=true;
    this.usernamCheckshow=false;
    
  }

  onOTPFormSubmit(){
    this.OTPshow=false;
    this.updatePasswordshow=true;
  }

  onUpdatePasswordFormSubmit(){
   
  }

}