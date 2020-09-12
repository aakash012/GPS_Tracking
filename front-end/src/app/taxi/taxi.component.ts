import { Component, OnInit } from '@angular/core';
import { Taxi } from '../taxi';
import { TaxiService } from '../taxi.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-taxi',
  templateUrl: './taxi.component.html',
  styleUrls: ['./taxi.component.css']
})

export class TaxiComponent implements OnInit {

  taxiList: Taxi[];
  taxiForm: any;
  taxiUpdate = null;

  constructor(private formbulider: FormBuilder, private taxiService: TaxiService) { }

  ngOnInit(): void {

    this.taxiForm = this.formbulider.group({
      taxiId: ['0'],
      taxiNo: ['', [Validators.required]],
      Company: ['', [Validators.required]]

    });

    this.getTaxiDetails();
  }

  getTaxiDetails() {
    this.taxiService.getAllTaxi().subscribe((data: Taxi[]) => {
      this.taxiList = data;
    });
  }

  onFormSubmit() {
    const taxi = this.taxiForm.value;
    alert(taxi);
    this.CreateTaxi(taxi);
    this.getTaxiDetails();
  }

  FillTaxiFormToEdit(TaxiId: number) {
    this.taxiService.getTaxiById(TaxiId).subscribe(Taxi => {
      this.taxiUpdate = Taxi.TaxiId;
      this.taxiForm.controls['taxiId'].setValue(Taxi.TaxiId);
      this.taxiForm.controls['taxiNo'].setValue(Taxi.TaxiNo);
      this.taxiForm.controls['Company'].setValue(Taxi.Company, { onlySelf: true });
      
    });

  }

  CreateTaxi(taxi: Taxi) {
    if (this.taxiUpdate == null) {
      this.taxiService.saveTaxi(taxi).subscribe(() => {
        this.taxiUpdate = null;
        this.ResetForm();
      });
    }
    else{
      this.taxiService.updateTaxi(taxi).subscribe(() => {
        this.taxiUpdate = null;
        this.ResetForm();
      });
    }


  }

  DeleteTaxi(TaxiId: number) {
    if (confirm("Are you sure you want to delete this ?")) {

      this.taxiService.deleteTaxiById(TaxiId).subscribe(() => {
        this.taxiUpdate = null;
      });
    }

  }
  
ResetForm() {
  this.taxiForm.reset();
  
}

}
