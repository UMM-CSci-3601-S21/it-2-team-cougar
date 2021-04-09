import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { MockContextPackService } from 'src/testing/contextpack.service.mock';
import { COMMON_IMPORTS } from '../app-routing.module';
import { Wordlist } from '../contextpacks/contextpack';
import { ContextPackService } from '../contextpacks/contextpack.service';

import { WordlistInfoComponent } from './wordlist-info.component';

describe('WordlistInfoComponent', () => {
  let component: WordlistInfoComponent;
  let fixture: ComponentFixture<WordlistInfoComponent>;
  //let wordlist: Wordlist = { name: '', enabled:true, nouns: [], verbs: [], adjectives: [], misc: []};
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();
  let editshow: false;

  const paramMap = new Map();
  paramMap.set('id', 'bark');
  paramMap.set('name', 'boo');


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordlistInfoComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule,RouterModule.forRoot([]),COMMON_IMPORTS],
      providers: [{ provide: ContextPackService, useValue: new MockContextPackService() },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(paramMap)
          }
        },]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordlistInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // component.words = [];
    component.wordType = 'noun';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a word', () => {
    // component.wordlist = {name:'sm',enabled:true,nouns:[{word:'boo',forms:[]}],verbs:[],adjectives:[],misc:[]};
    const wordlistLength = component.wordlist.nouns.length;
    component.addWord({word:'spaghetti',type:'nouns',forms:[]});
    component.addWord({word:'pasta',type:'nouns',forms:[]});
    component.addWord({word:'linguine',type:'nouns',forms:[]});
    component.addWord({word:'tortellini',type:'nouns',forms:[]});
    expect(component.wordlist.nouns.length).toBe((wordlistLength + 4));
    component.deleteWord(1);
    expect(component.wordlist.nouns.length).toBe((wordlistLength + 4));
  });

  it('add word should work with nouns', () => {
    const wordlistLength = component.wordlist.nouns.length;
    component.addWord({name:'noun',type:'nouns',forms:[]});
    expect(component.wordlist.nouns.length).toBe((wordlistLength + 1));
  });

  it('add word should work with adjectives', () => {
    const wordlistLength = component.wordlist.adjectives.length;
    component.addWord({name:'adjective',type:'adjectives',forms:[]});
    expect(component.wordlist.adjectives.length).toBe((wordlistLength + 1));
  });

  it('add word should work with verbs', () => {
    const wordlistLength = component.wordlist.verbs.length;
    component.addWord({name:'verb',type:'verbs',forms:[]});
    expect(component.wordlist.verbs.length).toBe((wordlistLength + 1));
  });

  it('add word should work with misc', () => {
    const wordlistLength = component.wordlist.misc.length;
    component.addWord({name:'misc',type:'misc',forms:[]});
    expect(component.wordlist.misc.length).toBe((wordlistLength + 1));
  });

  it('add word should not work with an empty word', () => {
    component.name = '';
    component.wordType = '';
    component.check();
    expect(component.finished).toBe(component.check());
  });

  it('the method save() should work', () => {
    component.save();
    expect(component.wordlist.name).toBe('boo');
  });
});
