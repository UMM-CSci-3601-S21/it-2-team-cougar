import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockContextPackService } from 'src/testing/contextpack.service.mock';
import { COMMON_IMPORTS } from '../app-routing.module';
import { ContextPackService } from '../contextpacks/contextpack.service';

import { WordlistInfoComponent } from './wordlist-info.component';

describe('WordlistInfoComponent', () => {
  let component: WordlistInfoComponent;
  let fixture: ComponentFixture<WordlistInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordlistInfoComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule,RouterModule.forRoot([]),COMMON_IMPORTS],
      providers: [{ provide: ContextPackService, useValue: new MockContextPackService() }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordlistInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
