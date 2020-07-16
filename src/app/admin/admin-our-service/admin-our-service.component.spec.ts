import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOurServiceComponent } from './admin-our-service.component';

describe('AdminOurServiceComponent', () => {
  let component: AdminOurServiceComponent;
  let fixture: ComponentFixture<AdminOurServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOurServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOurServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
