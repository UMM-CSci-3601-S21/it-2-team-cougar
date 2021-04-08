import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContextPack, Word, Wordlist } from '../contextpacks/contextpack';
import { ContextPackService } from '../contextpacks/contextpack.service';

@Component({
  selector: 'app-wordlist-info',
  templateUrl: './wordlist-info.component.html',
  styleUrls: ['./wordlist-info.component.scss']
})
export class WordlistInfoComponent implements OnInit {

  @Input() contextpack: ContextPack;
  wordlist: Wordlist;
  getUserSub: Subscription;
  enabled: boolean;

  id = '';
  name = '';
  words;
  wordType: string;
  types: string[];
  editshow= true;
  originalName: string;

  constructor(private router: ActivatedRoute, private contextPackService: ContextPackService, private route: Router) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((pmap) => {
      this.id = pmap ? pmap.get('id') : '';
      this.name = pmap ? pmap.get('name') : '';
      this.loadWords();

    });

  }

  addWord(word) {
    console.log(this.wordlist);
    this.wordlist[word.type].unshift({ word: word.name, forms: word.forms });
    this.words.unshift({ word: word.name, forms: word.forms,type: word.type});
    this.types = this.refreshTypes(this.words);
  }

  deleteWord(i: number) {
    for (const current of
      [this.wordlist.nouns,
      this.wordlist.verbs,
      this.wordlist.adjectives,
      this.wordlist.misc]) {
      console.log(current + ' ' + this.words[i]);

      if (current.includes(this.words[i])) {
        current.splice(current.indexOf(this.words[i]), 1);
        this.words.splice(i, 1);
      }
    }
  }

  loadWords() {
    this.getUserSub = this.contextPackService.getWordListByName(this.name,this.id).subscribe(i => {
      this.wordlist = i;
      this.originalName = i.name;
      this.enabled = i.enabled;
      this.getAllWords();
    });
  }


  getAllWords() {
    const temp: Word[] = [];
    temp.push(...this.wordlist.nouns);
    temp.push(...this.wordlist.verbs);
    temp.push(...this.wordlist.adjectives);
    temp.push(...this.wordlist.misc);
    console.log(temp);
    this.words = temp;
    this.types = this.refreshTypes(temp);
  }

  refreshTypes(temp){
    return temp.map(w =>
      this.wordlist.nouns.includes(w) ? 'Noun' :
        this.wordlist.verbs.includes(w) ? 'Verb' :
          this.wordlist.adjectives.includes(w) ? 'Adjective' : 'Misc'
    );
  }

  change(){
    this.editshow = !this.editshow;
  }


  save(){
    this.wordlist.name = this.name;
    this.editshow = !this.editshow;
  }

  back(){
    this.contextPackService.editWordList(this.originalName, this.wordlist, this.id).subscribe();
    this.route.navigate(['contextpacks', this.id]);
  }

}
