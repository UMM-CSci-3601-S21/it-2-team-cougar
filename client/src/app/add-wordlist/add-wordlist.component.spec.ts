import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
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


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddWordlistComponent],
      imports: [HttpClientTestingModule,RouterTestingModule,RouterModule.forRoot([]),COMMON_IMPORTS],
      providers:[{provide: ActivatedRoute, useValue: activatedRoute,},
        { provide: ContextPackService, useValue: new MockContextPackService()},
        { provide: Router, useValue: mockRouter }]
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


});
