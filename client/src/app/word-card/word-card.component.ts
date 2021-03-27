import { Component, Input, OnInit } from '@angular/core';
import { ContextPack, Word, Wordlist } from '../contextpacks/contextpack';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss']
})
export class WordCardComponent implements OnInit {

  @Input() contextpack: ContextPack;
  @Input() wordlist: Wordlist;
  @Input() word: Word;

  constructor() { }

  ngOnInit(): void {
  }

}
