import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RequestPannelComponent} from "../request-pannel/request-pannel.component";
import {Inspection} from "../models/Inspection";
import {ActivatedRoute} from "@angular/router";
import {InspectionService} from "../inspection-data-input/inspection.service";
import {InspectionType} from "../models/InspectionType";
import {InspectionClass} from "../models/InspectionClass";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-inspection',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCard,
    MatCardHeader,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf,
    MatButton,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatError,
    MatIcon,
    MatInput,
    MatSuffix,
    ReactiveFormsModule,
    RequestPannelComponent
  ],
  templateUrl: './edit-inspection.component.html',
  styleUrl: './edit-inspection.component.css'
})
export class EditInspectionComponent implements OnInit{
  inspectionForm!: FormGroup;
  inspectionTypes: string[] = [];
  inspectionClasses: string[] = [];
  showRequestPanel: boolean = false;
  requestError: boolean = false;
  errorMessage: string = '';
  editInspectionSubscription: Subscription = new Subscription()

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private inspectionService: InspectionService
  ) {}

  ngOnInit(): void {
    this.inspectionForm = this.fb.group({
      imoNo: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      place: [''],
      inspector: [''],
      instructionNo: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      status: [''],
      startingDate: [''],
      endingDate: [''],
      additionalInfo: this.fb.array([], this.createAdditionalInfo()),
      additionalDocuments: this.fb.array([]),
      sendingDate: ['']
    });

    const imoNo = new Number(this.route.snapshot.paramMap.get('imoNo'));
    const startingDate = this.route.snapshot.paramMap.get('startingDate');

    this.inspectionTypes = Object.values(InspectionType);
    this.inspectionClasses = Object.values(InspectionClass);


    this.loadInspectionData(imoNo.valueOf(), startingDate!);
  }

  loadInspectionData(imoNo: number, startingDate: string): void {
    this.inspectionService.getInspectionByImoAndDate(imoNo, startingDate).subscribe((data :Inspection) => {
      this.inspectionForm.patchValue({
        imoNo: imoNo,
        place: data.place,
        inspector: data.inspector,
        instructionNo: data.instructionNo,
        status: data.status,
        startingDate: data.startingDate,
        endingDate: data.endingDate,
        sendingDate: data.sendingDate
      });

      const formAdditionalDocuments = this.inspectionForm.get('additionalDocuments') as FormArray;
      formAdditionalDocuments.clear();
      data.additionalDocuments.forEach(it => {
        formAdditionalDocuments.push(new FormControl(it));
      })

      this.setAdditionalInfo(data.additionalInfo);
    });
  }

  setAdditionalInfo(additionalInfo: any[]): void {
    const additionalInfoFormArray = this.inspectionForm.get('additionalInfo') as FormArray;
    additionalInfoFormArray.clear();

    additionalInfo.forEach(info => {
      additionalInfoFormArray.push(this.fb.group({
        certificateNo: [info.certificateNo, [Validators.required, Validators.pattern(/^\d+$/)]],
        inspectionClass: [info.inspectionClass],
        inspectionType: [info.inspectionType],
        documentNo: [info.documentNo, [Validators.required, Validators.pattern(/^\d+$/)]],
        state: [info.state]
      }));
    });
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

  closeRequestPannel(event: boolean): void {
    this.inspectionForm.markAsPristine();
    this.inspectionForm.markAsUntouched();
    this.requestError = false;
    this.showRequestPanel = event;
  }

  toggleStatus(): void {
    const currentValue = this.inspectionForm.get('status')?.value;
    this.inspectionForm.get('status')?.setValue(currentValue === 'DONE' ? 'ACTIVE' : 'DONE');
    if(this.inspectionForm.get('status')?.value == 'ACTIVE'){
      this.inspectionForm.get('sendingDate')?.setValue('');
    }
  }

  onSubmit() {
    if (this.inspectionForm.valid) {
      if (this.inspectionForm.valid) {
        const formValue = this.inspectionForm.value;
        if(this.inspectionForm.get('status')?.value == 'ACTIVE'){
          this.inspectionForm.get('sendingDate')?.setValue('');
        }
        this.editInspectionSubscription = this.inspectionService.updateInspection(formValue).subscribe({
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
  }
}
