import { InspectionType } from "./InspectionType";
import { InspectionClass } from "./InspectionClass";
import { InspectionAdditionalInfo } from "./InspectionAdditionalInfo";

export class Inspection {
  imoNo: number;
  place: string;
  inspector: string;
  instructionNo: number;
  status: string;
  sendingDate: Date;
  certificateNo: number;
  additionalInfo: InspectionAdditionalInfo[];
  additionalDocuments: string[];
  startingDate: Date;
  endingDate: Date;

  constructor(
    imoNo: number = 0,
    place: string = 'Unknown',
    inspector: string = 'Unknown',
    instructionNo: number = 0,
    status: string = 'DONE',
    certificateNo: number = 0,
    sendingDate: Date = new Date(),
    additionalInfo: InspectionAdditionalInfo[] = [],
    additionalDocuments: string[] = [],
    startingDate: Date = new Date(),
    endingDate: Date = new Date(new Date().setMonth(new Date().getMonth() + 1)),
  ) {
    this.imoNo = imoNo;
    this.place = place;
    this.inspector = inspector;
    this.instructionNo = instructionNo;
    this.status = status;
    this.certificateNo = certificateNo;
    this.additionalInfo = additionalInfo;
    this.sendingDate = sendingDate;
    this.additionalDocuments = additionalDocuments;
    this.startingDate = startingDate;
    this.endingDate = endingDate;
  }
}
