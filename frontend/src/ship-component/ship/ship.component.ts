import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ShipService} from "./ship.service";
import {Ship} from "../../models/Ship";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  templateUrl: './ship.component.html',
  styleUrl: './ship.component.css'
})
export class ShipComponent implements OnInit, OnDestroy {

  shipForm!: FormGroup;
  shipTypes!: string[];
  saveShipSubscription!: Subscription;

  constructor(private fb: FormBuilder, private shipService: ShipService, private snackBar: MatSnackBar) {}

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
          this.snackBar.open('Успешна заявка!', '', {
            duration: 1000
          })
        },
        error: (err: any) => {
          this.snackBar.open(`Неуспешна заявка! Грешка: ${err.error.error}`, '', {
            duration: 1000
          })
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
