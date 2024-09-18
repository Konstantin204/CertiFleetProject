import {Certificate} from "./Certficate";
import {CertificateTypes} from "./CertificateTypes";
import {IncomingInspection} from "./IncomingInspection";


export class PermanentCertificate extends Certificate {
  incomingInspections: IncomingInspection[];

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
    reason: string,
    incomingInspections: IncomingInspection[] = []
  ) {
    super(
      imoNo,
      certificateType,
      certificateNumber,
      issuedBy,
      issuedIn,
      issuedOn,
      validTo,
      inspectionDate,
      status,
      reason
    );
    this.incomingInspections = incomingInspections;
  }
}
