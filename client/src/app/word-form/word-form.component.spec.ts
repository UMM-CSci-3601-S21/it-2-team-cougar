import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordFormComponent } from './word-form.component';

describe('WordFormComponent', () => {
  let component: WordFormComponent;
  let fixture: ComponentFixture<WordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not accept empty types', () => {
    expect(component.form).toBeTruthy();
  });
  it('adding works for valid values', () => {
    component.wordForm = 'something';
    component.add();
    expect(component.added).toBe(true);
  });
  it('adding doesnt work for valid values', () => {
    component.wordForm = '';
    component.add();
    expect(component.added).toBe(false);
  });
});
