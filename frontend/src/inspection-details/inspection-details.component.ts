import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {Inspection} from "../models/Inspection";
import {map, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {InspectionService} from "../inspection-data-input/inspection.service";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-inspection-details',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardHeader,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    MatDivider,
    DatePipe,
    MatIcon
  ],
  templateUrl: './inspection-details.component.html',
  styleUrl: './inspection-details.component.css'
})
export class InspectionDetailsComponent implements OnInit{

  imoNos$!: Observable<number[]>;
  inspections!: Inspection[];
  inspectionImoNo!: number;

  constructor(private activatedRoute: ActivatedRoute, private inspectionService: InspectionService, private router: Router) {
  }

  ngOnInit() {
    this.imoNos$ = this.activatedRoute.data.pipe(map(data => data['imoNos']));
  }


  getInspectionByImo($event: any){
    this.inspectionImoNo = $event.source.value
    this.inspectionService.getInspectionByImoNo($event.source.value).subscribe((inspections: Inspection[]) => {
      this.inspections = inspections
    });
  }

  redirectToEdit(imoNo: number, startingDate: Date): void {
    this.router.navigate(['/edit', imoNo, startingDate]);
  }

}
