import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { Register } from '../register';
import {Observable} from 'rxjs';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  data = false;
  signUpForm: any;
  massage:string;
  constructor( private formbulider: FormBuilder, private loginService:LoginServiceService ) { }

  ngOnInit() {
      this.signUpForm = this.formbulider.group({
      CustomerName: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      ContactNo: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }
  onFormSubmit()
  {
    const Customer = this.signUpForm.value;
    this.CreateCustomer(Customer);
  }
  CreateCustomer(register:Register)
  {
  this.loginService.CreateCustomer(register).subscribe(
    ()=>
    {
      this.data = true;
      this.massage = 'Data saved Successfully';
      this.signUpForm.reset();
    });
  }

}
