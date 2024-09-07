import {PermanentCertificate} from "./PermanentCertificate";
import {TemporaryCertificate} from "./TemporaryCertificate";
import {Inspection} from "./Inspection";

export class Ship {
  id: number;
  imoNo: number;
  name: string;
  port: string;
  grt: number;
  constructionYear: number;
  length: number;
  insbNo: number;
  callSign: string;
  nrt: number;
  constructionPlace: string;
  width: number;
  flag: string;
  powerKW: number;
  factory: string;
  boardHeight: number;
  permanentCertificates: PermanentCertificate[];
  temporaryCertificates: TemporaryCertificate[];
  inspections: Inspection[];

  constructor(
    id: number,
    imoNo: number,
    name: string,
    port: string,
    grt: number,
    constructionYear: number,
    length: number,
    insbNo: number,
    callSign: string,
    nrt: number,
    constructionPlace: string,
    width: number,
    flag: string,
    powerKW: number,
    factory: string,
    boardHeight: number,
    permanentCertificates: PermanentCertificate[],
    temporaryCertificates: TemporaryCertificate[],
    inspections: Inspection[]
  ) {
    this.id = id;
    this.imoNo = imoNo;
    this.name = name;
    this.port = port;
    this.grt = grt;
    this.constructionYear = constructionYear;
    this.length = length;
    this.insbNo = insbNo;
    this.callSign = callSign;
    this.nrt = nrt;
    this.constructionPlace = constructionPlace;
    this.width = width;
    this.flag = flag;
    this.powerKW = powerKW;
    this.factory = factory;
    this.boardHeight = boardHeight;
    this.permanentCertificates = permanentCertificates;
    this.temporaryCertificates = temporaryCertificates;
    this.inspections = inspections
  }
}
