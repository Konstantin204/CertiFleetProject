import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCertificateComponent } from './edit-certificate.component';

describe('EditCertificateComponent', () => {
  let component: EditCertificateComponent;
  let fixture: ComponentFixture<EditCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCertificateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
