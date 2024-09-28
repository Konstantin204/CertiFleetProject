import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {ShipService} from "./ship.service";

export const shipResolver: ResolveFn<Object> = (route, state) => {
  return inject(ShipService).getImoNos();
};
