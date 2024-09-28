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
import {ActivatedRoute} from "@angular/router";
import {CertificateTypes} from "../../models/CertificateTypes";
import {BehaviorSubject, map, Observable, Subscription} from "rxjs";
import {CertificateService} from "./certificate.service";
import {PermanentCertificate} from "../../models/PermanentCertificate";
import {TemporaryCertificate} from "../../models/TemporaryCertificate";
import {Certificate} from "../../models/Certficate";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private certificateService: CertificateService,
              private snackBar: MatSnackBar) {
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
          this.snackBar.open('Успешна заявка!', '', {
            duration: 1000
          });
        },
        error: (err) => {
          this.snackBar.open(`Неуспешна заявка! Грешка: ${err.error.error}`, '',{
            duration: 1000
          })
        }
      });

    } else {
      console.log('Form is not valid!');
    }
  }


  ngOnDestroy(): void {
    this.saveCertificateSubscription?.unsubscribe();
  }
}
