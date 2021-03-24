import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordlistInfoComponent } from './wordlist-info.component';

describe('WordlistInfoComponent', () => {
  let component: WordlistInfoComponent;
  let fixture: ComponentFixture<WordlistInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordlistInfoComponent ]
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
