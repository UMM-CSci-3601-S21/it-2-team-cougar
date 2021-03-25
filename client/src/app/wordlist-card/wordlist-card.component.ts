import { Component, Input, OnInit } from '@angular/core';
import { ContextPack, Wordlist, WordRole } from 'src/app/contextpacks/contextpack';

@Component({
  selector: 'app-wordlist-card',
  templateUrl: './wordlist-card.component.html',
  styleUrls: ['./wordlist-card.component.scss']
})
export class WordlistCardComponent implements OnInit {

  @Input() contextpack: ContextPack;
  @Input() wordlist: Wordlist;
  @Input() simple ? = false;
  selected = 'true';

  constructor() { }

  ngOnInit(): void {
  }


  displayWords(wordlist: Wordlist, pos: WordRole){
    let words: string[];
    let str: string;
    if (wordlist[`${pos}`] === undefined){
      words = null;
      str = null;
    }
    else{
      let i: number;
      words = [];
        for (i = 0; i < wordlist[`${pos}`].length; i++) {
          words = words.concat(wordlist[`${pos}`][i].forms) ;
        }
        str = words.join(', ');
        str += '\n';
    }

    return str;
  }


  displayAllWords(contextpack: ContextPack, pos: WordRole){
    let words: Wordlist[];
    let m: number;
    let str: string;
    if(contextpack.wordlists === undefined || contextpack.wordlists[0][`${pos}`][0] === undefined){
      words = null;
      str = null;
    }
    else{
      words = [];
    for (m = 0; m < contextpack.wordlists.length; m++){
        words = words.concat(contextpack.wordlists[m]);
      }

    let z: number;
    str = '\n';
    for (z = 0; z < words.length; z++){
      str += this.displayWords(words[z], pos);
      str = str.slice(0, -1);
      if (z < words.length-1 && !(words[z+1][`${pos}`][0]===undefined)){
        str += ', ';
        }
      }
    }
    return str;
}

}
