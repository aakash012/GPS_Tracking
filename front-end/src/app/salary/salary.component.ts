import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Salary} from '../salary';
import {SalaryService} from '../salary.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {

  salaryForm:any;
  salaryList:Salary[];

  constructor(private formbulider: FormBuilder, private salaryService: SalaryService) { }

  ngOnInit(): void {
    
    this.salaryForm = this.formbulider.group({
      SalaryMonth: ['', [Validators.required]],
      FinancialYear: ['', [Validators.required]]
      

    });

   
  }

  getAllDriverSalary() {
    var salaryMonth=this.salaryForm.get('SalaryMonth').value;
    var FinancialYear= this.salaryForm.get('FinancialYear').value;
    this.salaryService.getAllDriverSalary(salaryMonth,FinancialYear).subscribe((data: Salary[]) => {
      this.salaryList = data;
    });
  }

  onFormSubmit()
  {
    const salary=this.salaryForm.value;
    this.calculateSalary(salary);
  }

  calculateSalary(salary:Salary)
  {
    this.salaryService.calculateSalary(salary).subscribe(() => {
        
   });
  }

}
