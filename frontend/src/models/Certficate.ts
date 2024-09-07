import {CertificateTypes} from "./CertificateTypes";

export class Certificate {
  imoNo: number;
  certificateType: CertificateTypes;
  certificateNumber: number;
  issuedBy: string;
  issuedIn: string;
  issuedOn: Date;
  validTo: Date;
  inspectionDate: Date;
  status: string;
  reason: string;

  constructor(
    imoNo: number,
    certificateType: CertificateTypes,
    certificateNumber: number,
    issuedBy: string,
    issuedIn: string,
    issuedOn: Date,
    validTo: Date,
    inspectionDate: Date,
    status: string,
    reason: string
  ) {
    this.imoNo = imoNo
    this.certificateType = certificateType;
    this.certificateNumber = certificateNumber;
    this.issuedBy = issuedBy;
    this.issuedIn = issuedIn;
    this.issuedOn = issuedOn;
    this.validTo = validTo;
    this.inspectionDate = inspectionDate;
    this.status = status;
    this.reason = reason;
  }
}
