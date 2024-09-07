import {Routes} from '@angular/router';
import {ShipDataInputComponent} from "../ship-data-input/ship-data-input.component";
import {DocumentsStatusComponent} from "../ship-documents-status/documents-status.component";
import {InspectionDataInputComponent} from "../inspection-data-input/inspection-data-input.component";
import {InspectionDetailsComponent} from "../inspection-details/inspection-details.component";
import {inspectionResolver} from "../inspection-data-input/inspection.resolver";
import {EditInspectionComponent} from "../edit-inspection/edit-inspection.component";
import {CertificateComponent} from "../certificate/certificate.component";
import {certificateResolver} from "../certificate/certificate-resolver";
import {CertificateDetailsComponent} from "../certificate-details/certificate-details.component";
import {EditCertificateComponent} from "../edit-certificate/edit-certificate.component";
import {ShipDetailsComponent} from "../ship-details/ship-details.component";
import {documentStatusResolver} from "../ship-documents-status/document-status.resolver";
import {shipResolver} from "../ship-data-input/ship.resolver";
import {EditShipComponent} from "../edit-ship/edit-ship.component";
import {DocumentsStatusInDetailComponent} from "../documents-status-in-detail/documents-status-in-detail.component";


export const routes: Routes = [
  {path: 'ship-data-input', component: ShipDataInputComponent},
  {path: 'ship-details', component: ShipDetailsComponent, resolve: {imoNos: shipResolver}},
  {path: 'edit-ship', component: EditShipComponent, resolve: {imoNos: shipResolver}},
  {path: 'documents-statuses', component: DocumentsStatusComponent, resolve: {ships: documentStatusResolver}},
  {path: 'documents-status-in-detail', component: DocumentsStatusInDetailComponent, resolve: {ships: documentStatusResolver}},
  {path: 'inspection-data-input', component: InspectionDataInputComponent, resolve: {imoNos: inspectionResolver}},
  {path: 'inspection-details', component: InspectionDetailsComponent, resolve: {imoNos: inspectionResolver}},
  {path: 'edit/:imoNo/:startingDate', component: EditInspectionComponent },
  {path: 'certificate/:type', component: CertificateComponent, resolve: {imoNos: certificateResolver}},
  {path: 'certificate-details', component: CertificateDetailsComponent, resolve: {imoNos: certificateResolver}},
  {path: 'edit-certificate/:imoNo/:certNumber/:type', component: EditCertificateComponent}
];
