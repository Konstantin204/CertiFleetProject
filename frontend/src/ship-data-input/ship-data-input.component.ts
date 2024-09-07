import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ShipService} from "./ship.service";
import {Ship} from "../models/Ship";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-ship-data-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelect,
    MatLabel,
    MatButton,
    AsyncPipe,
    NgForOf,
    NgIf,
    MatFormField,
    MatCard,
    MatCardHeader,
    NgStyle,
    MatOption,
    MatIcon,
    MatInput
  ],
  templateUrl: './ship-data-input.component.html',
  styleUrl: './ship-data-input.component.css'
})
export class ShipDataInputComponent implements OnInit, OnDestroy {

  shipForm!: FormGroup;
  shipTypes!: string[];
  showRequestPanel: boolean = false;
  requestError: boolean = false;
  errorMessage: string = '';
  saveShipSubscription!: Subscription;

  constructor(private fb: FormBuilder, private shipService: ShipService) {}

  ngOnInit(): void {
    this.shipTypes = ['Cargo', 'Tanker', 'Passenger', 'Fishing', 'Other'];
    this.initializeFromGroup();
  }

  initializeFromGroup() {
    this.shipForm = this.fb.group({
      ships: this.fb.array([this.createShipFG()])
    });
  }

  createShipFG(): FormGroup {
    return this.fb.group({
      imoNo: [null, [Validators.required, Validators.pattern('^\\d+$')]],
      name: ['', Validators.required],
      port: ['', Validators.required],
      grt: [null, Validators.required],
      constructionYear: [null, Validators.required],
      length: [null, Validators.required],
      width: [null, Validators.required],
      flag: ['', Validators.required],
      powerKW: [null, Validators.required],
      factory: ['', Validators.required],
      boardHeight: [null, Validators.required],
      constructionPlace: ['', Validators.required],
      callSign: ['', Validators.required]
    });
  }

  get ships(): FormArray {
    return this.shipForm.get('ships') as FormArray;
  }

  addShip(): void {
    this.ships.push(this.createShipFG());
  }

  removeShip(index: number): void {
    this.ships.removeAt(index);
  }

  onSubmit(): void {
    if (this.shipForm.valid) {
      const shipList: Ship[] = this.shipForm.value.ships;
      this.saveShipSubscription = this.shipService.saveShipData(shipList).subscribe({
        next: () => {
          this.showRequestPanel = true;
        },
        error: (err: any) => {
          this.requestError = true;
          this.errorMessage = err.error;
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }


  ngOnDestroy(): void {
    this.saveShipSubscription?.unsubscribe();
  }
}
