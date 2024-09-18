import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {RequestPannelComponent} from "../request-pannel/request-pannel.component";
import {BehaviorSubject, map, Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CertificateService} from "../certificate/certificate.service";
import {CertificateTypes} from "../models/CertificateTypes";
import {PermanentCertificate} from "../models/PermanentCertificate";
import {TemporaryCertificate} from "../models/TemporaryCertificate";
import {IncomingInspection} from "../models/IncomingInspection";

@Component({
  selector: 'app-edit-certificate',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    MatButton,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatCard,
    MatCardHeader,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RequestPannelComponent
  ],
  templateUrl: './edit-certificate.component.html',
  styleUrl: './edit-certificate.component.css'
})
export class EditCertificateComponent implements OnInit, OnDestroy {
  type!: string | null;
  updateCertificateSubscription!: Subscription;
  header: string = "";
  certificateForm!: FormGroup;
  certificateTypes!: string[];
  imoNo!: number | null;
  certNumber!: number | null;
  showRequestPanel: boolean = false;
  requestError: boolean = false;
  errorMessage: string = '';
  incomingInspections: IncomingInspection[] = [];

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private certificateService: CertificateService) {
  }

  ngOnInit(): void {
    this.imoNo = new Number(this.route.snapshot.paramMap.get('imoNo')).valueOf();
    this.certNumber = new Number(this.route.snapshot.paramMap.get('certNumber')).valueOf();
    this.type = this.route.snapshot.paramMap.get('type');
    this.initData();
    this.formPatchVales();
    this.certificateTypes = Object.values(CertificateTypes)
  }

  initData() {
    if (this.type == "permanent") {
      this.header = "постоянен"
    } else {
      this.header = "временен"
    }
    this.initializeFromGroup();
  }

  initializeFromGroup() {
    this.certificateForm = this.fb.group({
      imoNo: [null, [Validators.required, Validators.pattern('^\\d+$')]],
      issuedBy: ['', Validators.required],
      issuedIn: ['', Validators.required],
      certificateNumber: [null, [Validators.required, Validators.pattern('^\\d+$')]],
      status: ['VALID', Validators.required],
      issuedOn: ['', Validators.required],
      validTo: ['', Validators.required],
      reason: [''],
      certificateType: ['', Validators.required],
      inspectionDate: ['', Validators.required]
    });
  }

  formPatchVales() {
    this.certificateService.getCertificateByImoNoAndNumber(this.imoNo!, this.certNumber!, this.type!).subscribe((data: any) => {
      this.certificateForm.patchValue({
        imoNo: this.imoNo,
        issuedBy: data.issuedBy,
        issuedIn: data.issuedIn,
        certificateNumber: data.certificateNumber,
        status: data.status,
        issuedOn: data.issuedOn,
        validTo: data.validTo,
        reason: data.reason,
        certificateType: data.certificateType,
        inspectionDate: data.inspectionDate,
      });
      if(data.incomingInspections){
        this.incomingInspections = data.incomingInspections;
      }
    })
  }

  onSubmit() {
    if (this.certificateForm.valid) {
      let certificate;
      if(this.certificateForm.get('status')?.value == 'VALID'){
        this.certificateForm.get('reason')?.setValue('');
      }
      const formValue = this.certificateForm.value;
      if (this.type == "permanent") {
        certificate = new PermanentCertificate(
          formValue.imoNo,
          formValue.certificateType,
          formValue.certificateNumber,
          formValue.issuedBy,
          formValue.issuedIn,
          formValue.issuedOn,
          formValue.validTo,
          formValue.inspectionDate,
          formValue.status,
          formValue.reason,
          this.incomingInspections
        );
      } else {
        certificate = new TemporaryCertificate(
          formValue.imoNo,
          formValue.certificateType,
          formValue.certificateNumber,
          formValue.issuedBy,
          formValue.issuedIn,
          formValue.issuedOn,
          formValue.validTo,
          formValue.inspectionDate,
          formValue.status,
          formValue.reason
        );
      }
      this.updateCertificateSubscription = this.certificateService.updateCertificate(certificate!, this.type!).subscribe({
        next: () => {
          this.showRequestPanel = true;
        },
        error: (err) => {
          this.requestError = true;
          this.errorMessage = err.error;
        }
      });

    } else {
      console.log('Form is not valid');
    }
  }

  closeRequestPannel(event: boolean): void {
    this.initializeFromGroup();
    this.certificateForm.markAsPristine();
    this.certificateForm.markAsUntouched();
    this.requestError = false;
    this.showRequestPanel = event;
  }


  ngOnDestroy(): void {
    this.updateCertificateSubscription.unsubscribe();
  }
}
