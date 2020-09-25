import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Salary} from '../salary';
import {SalaryService} from '../salary.service';

@Component({
  selector: 'app-driver-dashboard-salary',
  templateUrl: './driver-dashboard-salary.component.html',
  styleUrls: ['./driver-dashboard-salary.component.css']
})
export class DriverDashboardSalaryComponent implements OnInit {

  salaryForm:any;
  salaryList:Salary[];
  driverId:any;

constructor(private formbulider: FormBuilder, private salaryService: SalaryService) { }

  ngOnInit(): void {
    
    this.driverId = localStorage.getItem("DriverId");
    this.salaryForm = this.formbulider.group({
      SalaryMonth: ['', [Validators.required]],
      FinancialYear: ['', [Validators.required]]
      

    });
   
  }

  getAllDriverSalary() {
    var salaryMonth=this.salaryForm.get('SalaryMonth').value;
    var FinancialYear= this.salaryForm.get('FinancialYear').value;
    this.salaryService.GetSalaryForDriver(salaryMonth,FinancialYear,this.driverId).subscribe((data: Salary[]) => {
      this.salaryList = data;
    });
  }

  onFormSubmit()
  {
    const salary=this.salaryForm.value;
    this.getAllDriverSalary();
  }
}
