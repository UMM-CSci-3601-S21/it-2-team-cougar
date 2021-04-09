import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { MockContextPackService } from 'src/testing/contextpack.service.mock';
import { Wordlist } from '../contextpacks/contextpack';
import { ContextPackService } from '../contextpacks/contextpack.service';

import { WordlistCardComponent } from './wordlist-card.component';

describe('WordlistCardComponent', () => {
  let component: WordlistCardComponent;
  let fixture: ComponentFixture<WordlistCardComponent>;
  const activatedRoute: ActivatedRouteStub =
      new ActivatedRouteStub();
  const testWordList: Wordlist = {

        name: '',
        enabled: false,
        nouns: [],
        verbs: [],
        adjectives: [],
        misc: []
      };

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
    component.wordlist = component.wordlist = {
      name: 'farm_animals',
      enabled: true,
      nouns: [
        { word: 'cat', forms: ['cat', 'cats'] },
        { word: 'chicken', forms: ['chicken', 'chickens'] }
      ],
      verbs: [{ word: 'moo', forms: ['moo', 'moos', 'mooed', 'mooing'] },
      { word: 'oink', forms: ['oink', 'oinks', 'oinked', 'oinking'] },
      {
        word: 'cluck',
        forms: ['cluck', 'clucks', 'clucking', 'clucked']
      },
      { word: 'baa', forms: ['baa', 'baas', 'baaed', 'baaing'] },
      { word: 'meow', forms: ['meow', 'meows', 'meowing', 'meowed'] },],
      adjectives: [],
      misc: []
    };;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
