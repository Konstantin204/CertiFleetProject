import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {map, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {CertificateService} from "../certificate/certificate.service";
import {Certificate} from "../../models/Certficate";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";

@Component({
  selector: 'app-certificate-details',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButton,
    MatCard,
    MatCardHeader,
    MatFormField,
    MatIcon,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf,
    FormsModule,
    MatButtonToggle,
    MatButtonToggleGroup,
    ReactiveFormsModule
  ],
  templateUrl: './certificate-details.component.html',
  styleUrl: './certificate-details.component.css'
})
export class CertificateDetailsComponent implements OnInit{
  imoNos$!: Observable<number[]>;
  certificates!: Certificate[];
  certificateImoNo!: number;
  type: string = 'permanent'

  constructor(private activatedRoute: ActivatedRoute, private certificateService: CertificateService, private router: Router) {
  }

  ngOnInit() {
    this.imoNos$ = this.activatedRoute.data.pipe(map(data => data['imoNos']));
  }


  getInspectionByImo($event: any){
    this.certificateImoNo = $event.source.value
    this.certificateService.getCertificateByImoNo($event.source.value, this.type).subscribe((certificates: Certificate[]) => {
      this.certificates = certificates
    });
  }
  changeType(type: string){
    this.type = type
    if(this.certificateImoNo) {
      this.certificateService.getCertificateByImoNo(this.certificateImoNo, this.type).subscribe((certificates: Certificate[]) => {
        this.certificates = certificates
      });
    }
  }

  redirectToEdit(imoNo: number, certNumber: number, type: string): void {
    this.router.navigate(['/edit-certificate', imoNo, certNumber, type]);
  }
}
