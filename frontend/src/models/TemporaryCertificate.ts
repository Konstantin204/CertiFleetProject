import {Certificate} from "./Certficate";
import {CertificateTypes} from "./CertificateTypes";


export class TemporaryCertificate extends Certificate {

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
  }
}
