import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsStatusInDetailComponent } from './documents-status-in-detail.component';

describe('DocumentsStatusInDetailComponent', () => {
  let component: DocumentsStatusInDetailComponent;
  let fixture: ComponentFixture<DocumentsStatusInDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsStatusInDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentsStatusInDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
