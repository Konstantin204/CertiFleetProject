import { InspectionType } from "./InspectionType";
import { InspectionClass } from "./InspectionClass";

export class InspectionAdditionalInfo {
  inspectionType: InspectionType;
  inspectionClass: InspectionClass;
  documentNo: number;
  certificateNo: number;
  state: string;

  constructor(
    inspectionType: InspectionType = InspectionType.ANNUAL,
    inspectionClass: InspectionClass = InspectionClass.CLASS,
    documentNo: number = 0,
    certificateNo: number = 0,
    state: string = "ISSUED"
  ) {
    this.inspectionType = inspectionType;
    this.inspectionClass = inspectionClass;
    this.documentNo = documentNo;
    this.certificateNo = certificateNo;
    this.state = state
  }
}
