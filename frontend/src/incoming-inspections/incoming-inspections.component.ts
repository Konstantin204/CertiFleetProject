import {Component, OnInit} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatLabel} from "@angular/material/form-field";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {IncomingInspection} from "../models/IncomingInspection";
import {ActivatedRoute} from "@angular/router";
import {IncomingInspectionStatus} from "../models/IncomingInspectionStatus";

@Component({
  selector: 'app-incoming-inspections',
  standalone: true,
  imports: [
    MatCard,
    MatButton,
    MatIcon,
    MatLabel,
    NgForOf,
    NgIf,
    NgStyle
  ],
  templateUrl: './incoming-inspections.component.html',
  styleUrl: './incoming-inspections.component.css'
})
export class IncomingInspectionsComponent implements OnInit {
  incomingInspections: IncomingInspection[] = [];
  certificateNumber: number = 0;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.incomingInspections = JSON.parse(params['incomingInspection']);
      this.certificateNumber = params['certNo'];
    });
  }
  getColor(status: IncomingInspectionStatus){
    switch (status){
      case IncomingInspectionStatus.WARNING: return 'orange'
      case IncomingInspectionStatus.CRITICAL: return 'lightcoral'
      case IncomingInspectionStatus.GOOD: return 'lightgreen'
      default: return 'lightgreen'
    }

  }

}
