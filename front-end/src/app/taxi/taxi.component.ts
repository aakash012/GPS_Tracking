import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Taxi } from '../taxi';
import { TaxiService } from '../taxi.service';

@Component({
  selector: 'app-taxi',
  templateUrl: './taxi.component.html',
  styleUrls: ['./taxi.component.css']
})
export class TaxiComponent implements OnInit {

  dataSaved = false;
  taxiForm: any;
  allTaxis: Observable<Taxi[]>;
  taxiIdUpdate = null;
  message = null;
  constructor(
    private formbulider: FormBuilder,
    private taxiService: TaxiService
  ) {}

  ngOnInit(): void {
    this.taxiForm = this.formbulider.group({
      TaxiNo: ['', [Validators.required]],
      Company: ['', [Validators.required]],
    });

    this.allTaxis = this.taxiService.getAllTaxi();
  }

  onFormSubmit() {
    debugger;
    this.dataSaved = false;
    const taxi = this.taxiForm.value;
    this.CreateTaxi(taxi);
    this.taxiForm.reset();
  }
  loadTaxiToEdit(taxiId: string) {
    this.taxiService.getTaxiById(taxiId).subscribe((taxi) => {
      debugger;
      this.message = null;
      this.dataSaved = false;
      this.taxiIdUpdate = taxi.TaxiId;
      this.taxiForm.controls['TaxiNo'].setValue(taxi.TaxiNo);
      this.taxiForm.controls['Company'].setValue(taxi.Company, {
        onlySelf: true,
      });
    });
  }
  CreateTaxi(taxi: Taxi) {
    if (this.taxiIdUpdate == null) {
      this.taxiService.createTaxi(taxi).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Record saved Successfully';
        this.taxiIdUpdate = null;
        this.taxiForm.reset();
      });
    } else {
      taxi.TaxiId = this.taxiIdUpdate;
      this.taxiService.updateTaxi(taxi).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Record Updated Successfully';
        this.taxiIdUpdate = null;
        this.taxiForm.reset();
      });
    }
  }
  deleteUser(taxiId: string) {
    if (confirm("Are you sure you want to delete this ?")) {
      debugger;
    this.taxiService.deleteTaxiById(taxiId).subscribe(() => {
      this.dataSaved = true;
      this.message = 'Record Deleted Succefully';
      this.taxiIdUpdate = null;
      this.taxiForm.reset();

    });
  }
}
}
