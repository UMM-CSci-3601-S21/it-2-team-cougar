import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { MockContextPackService } from 'src/testing/contextpack.service.mock';
import { COMMON_IMPORTS } from '../app-routing.module';
import { ContextPackService } from '../contextpacks/contextpack.service';

import { AddWordlistComponent } from './add-wordlist.component';


describe('AddWordlistComponent', () => {
  let component: AddWordlistComponent;
  let fixture: ComponentFixture<AddWordlistComponent>;
  const activatedRoute: ActivatedRouteStub =
    new ActivatedRouteStub();
  let mockRouter: any;
  class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }
  const paramMap = new Map();
  paramMap.set('id', 'bark');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddWordlistComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, RouterModule.forRoot([]), COMMON_IMPORTS],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          paramMap: of(paramMap)
        }
      },
      { provide: ContextPackService, useValue: new MockContextPackService() },
      { provide: Router, useValue: new MockRouter() }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWordlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not accept empty names', () => {
    component.check();
    expect(component.finished).toBe(false);
  });

  it('should allow the name "Farm"', () => {
    component.wordlistname = 'Farm';
    component.check();
    expect(component.finished).toBe(true);
  });

  it('should allow for a name containing numbers', () => {
    component.wordlistname = 'Spiderman 2';
    component.check();
    expect(component.finished).toBe(true);
  });

  it('the method save() should work', () => {
    component.wordlistname = 'Farm';
    component.check();
    component.save();
    expect(component.wordList.name).toBe(component.wordlistname);
  });

  it('should not save an empty name', () => {
    component.wordlistname = '';
    component.id = 'testid';
    component.check();
    component.save();
    expect(component.wordList.name).toBe(component.wordlistname);
  });

});
