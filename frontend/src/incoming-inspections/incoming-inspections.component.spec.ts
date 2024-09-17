import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingInspectionsComponent } from './incoming-inspections.component';

describe('IncomingInspectionsComponent', () => {
  let component: IncomingInspectionsComponent;
  let fixture: ComponentFixture<IncomingInspectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomingInspectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncomingInspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
