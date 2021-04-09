import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContextpackNameComponent } from './edit-contextpack-name.component';

describe('EditContextpackNameComponent', () => {
  let component: EditContextpackNameComponent;
  let fixture: ComponentFixture<EditContextpackNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditContextpackNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContextpackNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
