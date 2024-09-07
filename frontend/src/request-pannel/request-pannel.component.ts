import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-request-pannel',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatIcon,
    NgIf,
    MatButton
  ],
  templateUrl: './request-pannel.component.html',
  styleUrl: './request-pannel.component.css'
})
export class RequestPannelComponent{
  @Input() error: boolean = false;
  @Input() errorMessage: string = '';
  @Output() closed: EventEmitter<boolean> = new EventEmitter();

}
