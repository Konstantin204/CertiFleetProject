import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {InspectionType} from '../../models/InspectionType';
import {InspectionClass} from '../../models/InspectionClass';
import {InspectionService} from './inspection.service';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatError, MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatInputModule, MatLabel} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {map, Observable, Subscription} from "rxjs";
import {MatIcon} from "@angular/material/icon";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-inspection-data-input',
  standalone: true,
  imports: [FormsModule,
    MatButton,
    MatCard,
    MatCardHeader,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInputModule,
    MatError,
    MatLabel,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule,
    MatOption,
    NgForOf,
    NgIf,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatIcon,
    AsyncPipe],
  providers: [DatePipe],
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit, OnDestroy {
  inspectionForm!: FormGroup;
  inspectionTypes: string[] = [];
  inspectionClasses: string[] = [];
  saveInspectionSubscription: Subscription = new Subscription();
  imoNos$!: Observable<number[]>;

  constructor(
    private fb: FormBuilder,
    private inspectionDataService: InspectionService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.imoNos$ = this.activatedRoute.data.pipe(map(data => data['imoNos']));
    this.initializeForm();
  }

  initializeForm(): void {
    this.inspectionForm = this.fb.group({
      imoNo: [null, [Validators.required, Validators.pattern('^\\d+$')]],
      place: ['', Validators.required],
      inspector: ['', Validators.required],
      instructionNo: [null, [Validators.required, Validators.pattern('^\\d+$')]],
      status: ['ACTIVE'],
      sendingDate: [''],
      additionalInfo: this.fb.array([this.createAdditionalInfo()]),
      additionalDocuments: this.fb.array([]),
      startingDate: ['', Validators.required],
      endingDate: ['', Validators.required],
    });

    this.inspectionTypes = Object.values(InspectionType);
    this.inspectionClasses = Object.values(InspectionClass);
  }

  createAdditionalInfo(): FormGroup {
    return this.fb.group({
      inspectionType: [null, Validators.required],
      inspectionClass: [null, Validators.required],
      certificateNo: [null, [Validators.required, Validators.pattern('^\\d+$')]],
      documentNo: [null, [Validators.required, Validators.pattern('^\\d+$')]],
      state: ['ISSUED', Validators.required]
    });
  }

  get additionalInfo(): FormArray {
    return this.inspectionForm.get('additionalInfo') as FormArray;
  }

  addAdditionalInfo(): void {
    this.additionalInfo.push(this.createAdditionalInfo());
  }

  removeAdditionalInfo(index: number): void {
    this.additionalInfo.removeAt(index);
  }

  get additionalDocuments(): FormArray {
    return this.inspectionForm.get('additionalDocuments') as FormArray;
  }

  addDocument(): void {
    this.additionalDocuments.push(new FormControl(''));
  }

  removeDocument(index: number): void {
    this.additionalDocuments.removeAt(index);
  }

  onSubmit(): void {
    if (this.inspectionForm.valid) {
      const formValue = this.inspectionForm.value;
      this.saveInspectionSubscription = this.inspectionDataService.saveNewInspection(formValue).subscribe({
        next: () => {
          this.snackBar.open('Успешна заявка!', '', {
            duration: 1000
          })
        },
        error: (err) => {
          this.snackBar.open(`Неуспешна заявка! Грешка: ${err.error.error}`, '', {
            duration: 1000
          })
        }
      });

    } else {
      console.log('Невалидна форма');
    }
  }


  toggleStatus(): void {
    const currentValue = this.inspectionForm.get('status')?.value;
    this.inspectionForm.get('status')?.setValue(currentValue === 'DONE' ? 'ACTIVE' : 'DONE');
  }

  ngOnDestroy(): void {
    this.saveInspectionSubscription.unsubscribe();
  }

  protected readonly event = event;
}
