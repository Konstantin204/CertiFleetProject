import {Routes} from '@angular/router';
import {ShipComponent} from "../ship-component/ship/ship.component";
import {DocumentsStatusComponent} from "../ship-documents-status/documents-status.component";
import {InspectionComponent} from "../inspection-component/inspection/inspection.component";
import {InspectionDetailsComponent} from "../inspection-component/inspection-details/inspection-details.component";
import {inspectionResolver} from "../inspection-component/inspection/inspection.resolver";
import {EditInspectionComponent} from "../inspection-component/edit-inspection/edit-inspection.component";
import {CertificateComponent} from "../certificate-component/certificate/certificate.component";
import {certificateResolver} from "../certificate-component/certificate/certificate-resolver";
import {CertificateDetailsComponent} from "../certificate-component/certificate-details/certificate-details.component";
import {EditCertificateComponent} from "../certificate-component/edit-certificate/edit-certificate.component";
import {ShipDetailsComponent} from "../ship-component/ship-details/ship-details.component";
import {documentStatusResolver} from "../ship-documents-status/document-status.resolver";
import {shipResolver} from "../ship-component/ship/ship.resolver";
import {EditShipComponent} from "../ship-component/edit-ship/edit-ship.component";
import {DocumentsStatusInDetailComponent} from "../documents-status-in-detail/documents-status-in-detail.component";
import {IncomingInspectionsComponent} from "../incoming-inspections/incoming-inspections.component";


export const routes: Routes = [
  {path: 'ship-data-input', component: ShipComponent},
  {path: 'ship-details', component: ShipDetailsComponent, resolve: {imoNos: shipResolver}},
  {path: 'edit-ship', component: EditShipComponent, resolve: {imoNos: shipResolver}},
  {path: 'documents-statuses', component: DocumentsStatusComponent, resolve: {ships: documentStatusResolver}},
  {path: 'documents-status-in-detail', component: DocumentsStatusInDetailComponent, resolve: {ships: documentStatusResolver}},
  {path: 'inspection-data-input', component: InspectionComponent, resolve: {imoNos: inspectionResolver}},
  {path: 'inspection-details', component: InspectionDetailsComponent, resolve: {imoNos: inspectionResolver}},
  {path: 'edit/:imoNo/:startingDate', component: EditInspectionComponent },
  {path: 'certificate/:type', component: CertificateComponent, resolve: {imoNos: certificateResolver}},
  {path: 'certificate-details', component: CertificateDetailsComponent, resolve: {imoNos: certificateResolver}},
  {path: 'edit-certificate/:imoNo/:certNumber/:type', component: EditCertificateComponent},
  {path: 'incoming-inspections', component: IncomingInspectionsComponent}
];
