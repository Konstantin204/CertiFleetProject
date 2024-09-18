import {Component, OnInit} from '@angular/core';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatIcon} from "@angular/material/icon";
import {map, Observable} from "rxjs";
import {Ship} from "../models/Ship";
import {ActivatedRoute, Router} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {Inspection} from "../models/Inspection";
import {Certificate} from "../models/Certficate";
import {PermanentCertificate} from "../models/PermanentCertificate";
import {IncomingInspectionStatus} from "../models/IncomingInspectionStatus";

@Component({
  selector: 'app-documents-status',
  standalone: true,
  imports: [MatInput, MatExpansionModule, MatAccordion, MatButton, MatCard, MatTab, MatTabGroup, MatIcon, AsyncPipe, NgIf, NgForOf, MatSlideToggle, MatFormField, MatLabel, MatOption, MatSelect, ReactiveFormsModule, NgStyle],
  templateUrl: './documents-status.component.html',
  styleUrl: './documents-status.component.css'
})
export class DocumentsStatusComponent implements OnInit {

  ships$!: Observable<Ship[]>;


  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.ships$ = this.activatedRoute.data.pipe(map(data => data['ships']));
  }

  getCertificateColor(certificate: any): string {
    if(certificate.status != "VALID" || certificate.incomingInspections.length == 0) return 'white';
    if (certificate.incomingInspections.some((inspection: any) => inspection.status === IncomingInspectionStatus.CRITICAL)) {
      return 'lightcoral';
    }
    if (certificate.incomingInspections.some((inspection: any) => inspection.status === IncomingInspectionStatus.WARNING)) {
      return 'orange';
    }
    return 'lightgreen';
  }

  calculateValidityColor(validTo: Date): string {
    const today = new Date();
    const validToDate = new Date(validTo);
    const diffMonths = today.getMonth() - validToDate.getMonth();

    if (diffMonths <= 1) {
      return 'lightcoral';
    } else if (diffMonths <= 2) {
      return 'orange';
    } else if (diffMonths <= 3) {
      return 'lightgreen';
    } else {
      return 'lightgreen';
    }
  }

  calculateInspectionColors(inspection: Inspection): string {
        if(inspection.status != "ACTIVE") return "white";
        const today = new Date();
        const startingDate = new Date(inspection.startingDate);
        const diffDays = Math.floor((today.getTime() - startingDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays > 25) {
          return 'lightgreen';
        } else if (diffDays >= 15) {
          return 'orange';
        } else {
          return 'lightcoral';
        }
  }

  navigateTo(certificate: PermanentCertificate){
    this.router.navigate(['/incoming-inspections'], {
      queryParams: {
        incomingInspection: JSON.stringify(certificate.incomingInspections),
        certNo: certificate.certificateNumber
      }});
  }
}
