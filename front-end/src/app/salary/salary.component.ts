import { Component, OnInit } from '@angular/core';
import {Salary} from '../salary';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {

  salaryForm:any;
  salaryList:Salary[];

  constructor() { }

  ngOnInit(): void {
  }

  onFormSubmit()
  {
    
  }

}
