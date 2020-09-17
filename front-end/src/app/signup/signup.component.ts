import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import { Register } from '../register';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, MinLengthValidator } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  data = false;
  signUpForm: any;
  message: string;
  submitted = false;
  passwordNotMatch = false;
  constructor(private router: Router, private formbulider: FormBuilder, private signUpService: SignupService) { }

  ngOnInit() {
    this.signUpForm = this.formbulider.group({
      CustomerName: ['', [Validators.required, Validators.minLength(6)]],
      Gender: ['', [Validators.required]],
      ContactNo: ['', [Validators.required, Validators.minLength(10)]],
      CustomerPassword: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
    });
  }


  password() {


  }
  onFormSubmit() {

    const Customer = this.signUpForm.value;
    const CustomerPassword = this.signUpForm.get('CustomerPassword').value;
    const ConfirmPassword = this.signUpForm.get('ConfirmPassword').value;

    if (this.signUpForm.invalid) {
      alert("Please fill all the credentials");
    }
    else if (CustomerPassword != ConfirmPassword) {
      alert("Password doesnot match!!");
      return;
    }


    this.CreateCustomer(Customer);
  }
  CreateCustomer(register: Register) {
    this.signUpService.CreateCustomer(register).subscribe(
      () => {
        this.data = true;
        this.message = 'Data saved Successfully';
        this.signUpForm.reset();
        this.router.navigate(['login']);
      });
  }

  onSignIn() {
    this.router.navigate(['login']);
  }
}
