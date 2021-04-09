import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContextPack, Word, Wordlist } from '../contextpacks/contextpack';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss']
})
export class WordCardComponent implements OnInit {

  @Input() contextpack: ContextPack;
  @Input() wordList: Wordlist;
  @Input() word: Word;
  @Input() type: string;
  @Input() isHidden: boolean;

  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.word);
  }

  deleteWord(){
    this.delete.emit();
  }

}
