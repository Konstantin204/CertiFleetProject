import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {DocumentsStatusComponent} from "../ship-documents-status/documents-status.component";
import {MatFormField} from "@angular/material/form-field";
import {ShipDataInputComponent} from "../ship-data-input/ship-data-input.component";
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,
    DocumentsStatusComponent,
    MatFormField,
    ShipDataInputComponent,
    NavBarComponent,
    RouterOutlet
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
