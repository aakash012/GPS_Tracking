import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customerList: Customer[];
  constructor(private formbulider: FormBuilder,private userService: CustomerService) {}


  ngOnInit(): void {

    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getAllCustomer().subscribe((data: Customer[]) => {
      this.customerList = data;
    });
  }

}
