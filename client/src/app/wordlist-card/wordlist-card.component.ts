import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContextPack, Word, Wordlist, WordRole } from 'src/app/contextpacks/contextpack';
import { ContextPackService } from '../contextpacks/contextpack.service';

@Component({
  selector: 'app-wordlist-card',
  templateUrl: './wordlist-card.component.html',
  styleUrls: ['./wordlist-card.component.scss']
})
export class WordlistCardComponent implements OnInit {

  @Input() contextpack: ContextPack;
  @Input() wordlist: Wordlist;
  @Input() simple ? = false;
  getUserSub: Subscription;
  originalName: string;



  words;
  wordType: string;
  types: string[];
  editshow= true;
  name = '';
  id = '';

  noun = 'Noun';
  verb = 'Verb';
  adj = 'Adjective';
  misc = 'Misc Word';

  constructor(private router: ActivatedRoute, private contextPackService: ContextPackService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((pmap) => {
      this.id = pmap ? pmap.get('id') : '';
      this.originalName = this.wordlist.name;
      console.log(this.originalName);
    });
  }

  change(){
    this.editshow = !this.editshow;
  }


  save(){
    this.wordlist.name = this.name;
    this.editshow = !this.editshow;
    this.contextPackService.editWordList(this.wordlist.name, this.wordlist, this.id).subscribe();
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




}
