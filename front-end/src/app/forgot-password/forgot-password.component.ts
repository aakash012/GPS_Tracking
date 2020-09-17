import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../forgot-password.service';
import { Login } from '../login';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  usernamCheckForm: any;
  OTPForm: any;
  updatePasswordForm: any;
  OTPshow = false;
  usernamCheckshow = true;
  updatePasswordshow = false;
  constructor(private router: Router, private formbulider: FormBuilder, private forgotPasswordService: ForgotPasswordService) { }

  ngOnInit(): void {

    this.usernamCheckForm = this.formbulider.group({
      UserName: ['', [Validators.required]]

    });
    this.OTPForm = this.formbulider.group({
      OTP: ['', [Validators.required]],

    });
    this.updatePasswordForm = this.formbulider.group({
      UserId: ['', [Validators.required]],
      UserPassword: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
    });
  }

  onSignIn() {
    this.router.navigate(['login']);
  }

  onUserNameFormSubmit() {

    const login = this.usernamCheckForm.value;

    if (this.usernamCheckForm.invalid) {
      alert("Please fill the username");
      return;
    }

    this.checkUserName(login);


  }

  checkUserName(login: Login) {

    this.forgotPasswordService.checkUserName(login).subscribe(
      data => {

        if (data != null) {
          this.OTPshow = true;
          this.usernamCheckshow = false;
          this.updatePasswordForm.controls['UserId'].setValue(data.UserId);

        }
        else {
          alert("Invalid Username");

        }
      });
  };

  onOTPFormSubmit() {
    var OTP = this.OTPForm.get('OTP').value;

    if (this.OTPForm.invalid) {
      alert("Please fill OTP sent");
      return;
    }

    if (OTP == 1111) {
      this.OTPshow = false;
      this.updatePasswordshow = true;
    }
    else {
      alert("OTP not matched!!");
      return;
    }

  }

  onUpdatePasswordFormSubmit() {

    const login = this.updatePasswordForm.value;

    const CustomerPassword = this.updatePasswordForm.get('UserPassword').value;
    const ConfirmPassword = this.updatePasswordForm.get('ConfirmPassword').value;

    if (this.updatePasswordForm.invalid) {
      alert("Please fill all the credentials");
      return;
    }

    if (CustomerPassword != ConfirmPassword) {
      alert("Password Not Matched");
      return;
    }


    this.UpdatePassword(login);
  }


  UpdatePassword(login: Login) {

    this.forgotPasswordService.updatePassword(login).subscribe(
      data => {

        if (data != null) {

          this.router.navigate(['login']);

        }
        else {
          alert("Password not saved");

        }
      });
  };
}
