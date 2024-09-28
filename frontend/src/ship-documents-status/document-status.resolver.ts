import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {ShipService} from "../ship-component/ship/ship.service";

export const documentStatusResolver: ResolveFn<Object> = (route, state) => {
  return inject(ShipService).getShips();
};
