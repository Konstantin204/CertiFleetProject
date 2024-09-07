import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RequestPannelComponent} from "../request-pannel/request-pannel.component";
import {ActivatedRoute} from "@angular/router";
import {CertificateTypes} from "../models/CertificateTypes";
import {BehaviorSubject, map, Observable, Subscription} from "rxjs";
import {CertificateService} from "./certificate.service";
import {PermanentCertificate} from "../models/PermanentCertificate";
import {TemporaryCertificate} from "../models/TemporaryCertificate";
import {Certificate} from "../models/Certficate";

@Component({
  selector: 'app-certificate-component',
  standalone: true,
  imports: [
    AsyncPipe,
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
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RequestPannelComponent,
    NgStyle
  ],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css'
})
export class CertificateComponent implements OnInit, OnDestroy {

  type!: string | null;
  typeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('permanent');
  subscription!: Subscription;
  saveCertificateSubscription!: Subscription;
  header: string = "";
  certificateListForm!: FormGroup;
  certificateTypes!: string[];
  imoNos$!: Observable<number[]>;
  showRequestPanel: boolean = false;
  requestError: boolean = false;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private certificateService: CertificateService) {
  }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      const type = params.get('type') || 'permanent';
      this.typeSubject.next(type);
    });

    this.typeSubject.subscribe(type => {
      this.type = type;
      this.initData();
    });

    this.imoNos$ = this.route.data.pipe(map(data => data['imoNos']));
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
    this.certificateListForm = this.fb.group({
      certificates: this.fb.array([this.createCertificateFG()])
    });
  }

  createCertificateFG() {
    return this.fb.group({
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

  get certificates(): FormArray {
    return this.certificateListForm.get('certificates') as FormArray;
  }

  addCertificate(): void {
    this.certificates.push(this.createCertificateFG());
  }

  removeCertificate(index: number): void {
    this.certificates.removeAt(index);
  }


  onSubmit() {
    if (this.certificateListForm.valid) {
      if (this.certificateListForm.get('status')?.value == 'VALID') {
        this.certificateListForm.get('reason')?.setValue('');
      }
      let certificateList: Certificate[] = [];
      const formValue = this.certificateListForm.value;
      formValue.certificates.forEach((certificate: Certificate) => {
        if (this.type == "permanent") {
          certificateList.push(
            new PermanentCertificate(
              certificate.imoNo,
              certificate.certificateType,
              certificate.certificateNumber,
              certificate.issuedBy,
              certificate.issuedIn,
              certificate.issuedOn,
              certificate.validTo,
              certificate.inspectionDate,
              certificate.status,
              certificate.reason
            )
          )
        } else {
          certificateList.push(new TemporaryCertificate(
            certificate.imoNo,
            certificate.certificateType,
            certificate.certificateNumber,
            certificate.issuedBy,
            certificate.issuedIn,
            certificate.issuedOn,
            certificate.validTo,
            certificate.inspectionDate,
            certificate.status,
            certificate.reason
          ));
        }
      })
      this.saveCertificateSubscription = this.certificateService.saveNewCertificate(certificateList!, this.type!).subscribe({
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
    this.certificateListForm.markAsPristine();
    this.certificateListForm.markAsUntouched();
    this.requestError = false;
    this.showRequestPanel = event;
  }


  ngOnDestroy(): void {
    this.saveCertificateSubscription?.unsubscribe();
  }
}
