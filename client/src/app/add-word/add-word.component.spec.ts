import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockContextPackService } from 'src/testing/contextpack.service.mock';
import { COMMON_IMPORTS } from '../app-routing.module';
import { ContextPackService } from '../contextpacks/contextpack.service';

import { AddWordComponent } from './add-word.component';

describe('AddWordComponent', () => {
  let component: AddWordComponent;
  let fixture: ComponentFixture<AddWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWordComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule,RouterModule.forRoot([]),COMMON_IMPORTS],
      providers: [{ provide: ContextPackService, useValue: new MockContextPackService() }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not accept empty names and types', () => {
    component.wordName = '';
    component.type = '';
    component.check();
    expect(component.finished).toBe(component.check());
  });

  it('should not accept a one character name', () => {
    component.wordName = 'k';
    component.check();
    expect(component.finished).toBe(component.check());
  });
  it('check() should work', () => {
    component.wordName = 'sda';
    component.type = 'Noun';
    expect(component.check()).toBe(true);
  });
  it('save() clears all fields', () => {
    component.wordName = 'sda';
    component.type = 'Noun';
    component.forms = ['','',''];
    component.save();
    expect(component.wordName).toBe('');
    expect(component.type).toBe('Noun');
    expect(component.forms).toEqual([]);

  });
});
