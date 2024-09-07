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
import {Ship} from "../models/Ship";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {ShipService} from "../ship-data-input/ship.service";

@Component({
  selector: 'app-ship-details',
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
  templateUrl: './ship-details.component.html',
  styleUrls: ['./ship-details.component.css']
})
export class ShipDetailsComponent implements OnInit{
  imoNos$!: Observable<number[]>;
  ship!: Ship;


  constructor(private activatedRoute: ActivatedRoute, private shipService: ShipService, private router: Router) {
  }

  ngOnInit() {
    this.imoNos$ = this.activatedRoute.data.pipe(map(data => data['imoNos']));
  }

  getShipByImo($event: any){
    this.shipService.getShipByImoNo($event.source.value).subscribe((ship: Ship) => {
      this.ship = ship
    });
  }

  redirectToEdit(imoNo: number): void {
    this.router.navigate(['/edit-ship', imoNo]);
  }
}
