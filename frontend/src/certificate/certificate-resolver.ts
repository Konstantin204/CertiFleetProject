import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {ShipService} from "../ship-data-input/ship.service";

export const certificateResolver: ResolveFn<Object> = (route, state) => {
  return inject(ShipService).getImoNos();
};
