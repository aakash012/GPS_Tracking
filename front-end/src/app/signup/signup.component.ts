import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import { Register } from '../register';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, MinLengthValidator } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  data = false;
  signUpForm: any;
  message:string;
  constructor( private router: Router, private formbulider: FormBuilder, private signUpService:SignupService ) { }

  ngOnInit() {
      this.signUpForm = this.formbulider.group({
      CustomerName: ['', [Validators.required, Validators.minLength(6)]],
      Gender: ['', [Validators.required]],
      ContactNo: ['', [Validators.required, Validators.minLength(10)]],
      CustomerPassword: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
    });
  }
  // password(formGroup: FormGroup) {
  //   const { value: CustomerPassword } = formGroup.get('CustomerPassword');
  //   const { value: ConfirmPassword } = formGroup.get('ConfirmPassword');
  //   return CustomerPassword === ConfirmPassword ? null : { passwordNotMatch: true };
  // }
  onFormSubmit()
  {
    const Customer = this.signUpForm.value;
    this.CreateCustomer(Customer);
  }
  CreateCustomer(register:Register)
  {
  this.signUpService.CreateCustomer(register).subscribe(
    ()=>
    {
      this.data = true;
      this.message = 'Data saved Successfully';
      this.signUpForm.reset();
      this.router.navigate(['userDashboard']);
    });
  }

}
