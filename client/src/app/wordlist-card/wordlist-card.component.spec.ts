import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { MockContextPackService } from 'src/testing/contextpack.service.mock';
import { ContextPackService } from '../contextpacks/contextpack.service';

import { WordlistCardComponent } from './wordlist-card.component';

describe('WordlistCardComponent', () => {
  let component: WordlistCardComponent;
  let fixture: ComponentFixture<WordlistCardComponent>;
  const activatedRoute: ActivatedRouteStub =
      new ActivatedRouteStub();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordlistCardComponent ],
      providers: [{provide: ActivatedRoute, useValue: activatedRoute,},
        { provide: ContextPackService, useValue: new MockContextPackService()},]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordlistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
