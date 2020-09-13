import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  dataSaved = false;
  customerForm: any;
  allCustomers: Observable<Customer[]>;
  constructor(
    private formbulider: FormBuilder,
    private userService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerForm = this.formbulider.group({
      customerName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.allCustomers = this.userService.getAllCustomer();
  }
  
}
