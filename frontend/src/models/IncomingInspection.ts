import {InspectionClass} from "./InspectionClass";
import {InspectionType} from "./InspectionType";
import {Certificate} from "./Certficate";
import {IncomingInspectionStatus} from "./IncomingInspectionStatus";

export class IncomingInspection {
  inspectionClass: InspectionClass;
  inspectionType: InspectionType;
  status: IncomingInspectionStatus;


  constructor(inspectionClass: InspectionClass, inspectionType: InspectionType, status: IncomingInspectionStatus) {
    this.inspectionClass = inspectionClass;
    this.inspectionType = inspectionType;
    this.status = status;
  }
}
